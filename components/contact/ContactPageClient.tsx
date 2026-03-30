"use client";

import dynamic from "next/dynamic";
import emailjs from "@emailjs/browser";
import Link from "next/link";
import { useMemo, useState } from "react";

const GlobeComponent = dynamic(() => import("@/components/GlobeComponent"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center bg-black text-sm text-white/60">
      Loading globe...
    </div>
  ),
});

type InquiryType = "luxury" | "study" | "corporate" | "visa";
type FormState = {
  inquiryType: InquiryType;
  name: string;
  email: string;
  phone: string;
  destination: string;
  month: string;
  travelers: string;
  budget: string;
  message: string;
};

const initialForm: FormState = {
  inquiryType: "luxury",
  name: "",
  email: "",
  phone: "",
  destination: "",
  month: "",
  travelers: "",
  budget: "",
  message: "",
};

type StepFieldKey = "destination" | "month" | "travelers" | "budget";
type StepFieldConfig = {
  key: StepFieldKey;
  label: string;
  type: "text" | "month" | "number";
  placeholder?: string;
  required?: boolean;
  min?: number;
};

type InquiryConfig = {
  label: string;
  step2Heading: string;
  step2Description: string;
  step2Fields: StepFieldConfig[];
  messageLabel: string;
  messagePlaceholder: string;
};

const inquiryConfig: Record<InquiryType, InquiryConfig> = {
  luxury: {
    label: "Luxury Travel Flow",
    step2Heading: "Trip Blueprint",
    step2Description: "Share travel timing, destination, and scale so we can shape your itinerary.",
    step2Fields: [
      {
        key: "destination",
        label: "Destination",
        type: "text",
        placeholder: "e.g. Japan, Swiss Alps, Amalfi Coast",
      },
      { key: "month", label: "Travel Month", type: "month" },
      { key: "travelers", label: "Travelers", type: "number", min: 1 },
      {
        key: "budget",
        label: "Approx Budget",
        type: "text",
        required: false,
        placeholder: "e.g. 8L - 12L",
      },
    ],
    messageLabel: "Tell us about your trip",
    messagePlaceholder: "Hotel style, experiences, pace, and any non-negotiables.",
  },
  study: {
    label: "Study Abroad Flow",
    step2Heading: "Academic Planning",
    step2Description: "We align country, intake timeline, and planning budget around your profile.",
    step2Fields: [
      {
        key: "destination",
        label: "Preferred Country / University",
        type: "text",
        placeholder: "e.g. UK, Canada, Germany",
      },
      { key: "month", label: "Preferred Intake Month", type: "month" },
      { key: "travelers", label: "Students", type: "number", min: 1 },
      {
        key: "budget",
        label: "Annual Budget Range",
        type: "text",
        required: false,
        placeholder: "Tuition + living estimate",
      },
    ],
    messageLabel: "Profile and goals",
    messagePlaceholder: "Course interest, current qualifications, and target timeline.",
  },
  corporate: {
    label: "Corporate & MICE Flow",
    step2Heading: "Program Scope",
    step2Description: "Let us know the destination, team size, and budget envelope for execution.",
    step2Fields: [
      {
        key: "destination",
        label: "Destination / Event City",
        type: "text",
        placeholder: "e.g. Dubai, Singapore, Barcelona",
      },
      { key: "month", label: "Program Month", type: "month" },
      { key: "travelers", label: "Delegates", type: "number", min: 1 },
      {
        key: "budget",
        label: "Program Budget",
        type: "text",
        required: false,
        placeholder: "Approx all-inclusive budget",
      },
    ],
    messageLabel: "Program requirements",
    messagePlaceholder: "Meeting goals, expected inclusions, and support expectations.",
  },
  visa: {
    label: "Visa Services Flow",
    step2Heading: "Application Snapshot",
    step2Description:
      "We need destination, travel timing, applicant count, and visa category to advise quickly.",
    step2Fields: [
      {
        key: "destination",
        label: "Destination Country",
        type: "text",
        placeholder: "e.g. USA, Schengen, UK",
      },
      { key: "month", label: "Planned Travel Month", type: "month" },
      { key: "travelers", label: "Applicants", type: "number", min: 1 },
      {
        key: "budget",
        label: "Visa Type",
        type: "text",
        placeholder: "Tourist / Business / Study",
      },
    ],
    messageLabel: "Current status and documents",
    messagePlaceholder: "Passport validity, prior refusals, urgency, and any constraints.",
  },
};

export default function ContactPageClient() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const activeInquiry = inquiryConfig[form.inquiryType];

  const progress = useMemo(() => {
    if (sent) return 100;
    return step === 1 ? 33 : step === 2 ? 66 : 90;
  }, [step, sent]);

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validateStep = (targetStep: number) => {
    if (targetStep === 1) {
      if (!form.name || !form.email || !form.phone) {
        return "Please fill name, email and phone.";
      }
      if (!/\S+@\S+\.\S+/.test(form.email)) {
        return "Please enter a valid email.";
      }
      return "";
    }

    if (targetStep === 2) {
      const missingField = activeInquiry.step2Fields.find((field) => {
        const isRequired = field.required ?? true;
        return isRequired && !String(form[field.key]).trim();
      });

      if (missingField) {
        return `Please fill ${missingField.label.toLowerCase()}.`;
      }
      return "";
    }

    if (targetStep === 3) {
      if (!form.message) {
        return "Please add a short message so we can prepare your itinerary.";
      }
      return "";
    }

    return "";
  };

  const nextStep = () => {
    const msg = validateStep(step);
    if (msg) {
      setError(msg);
      return;
    }
    setError("");
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setError("");
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const msg = validateStep(3);
    if (msg) {
      setError(msg);
      return;
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setError("Email service is not configured yet. Add EmailJS env vars to continue.");
      return;
    }

    try {
      setError("");
      setIsSending(true);

      await emailjs.send(
        serviceId,
        templateId,
        {
          inquiry_type: form.inquiryType,
          inquiry_flow: activeInquiry.label,
          name: form.name,
          email: form.email,
          phone: form.phone,
          destination: form.destination,
          month: form.month,
          travelers: form.travelers,
          budget: form.budget || "Not specified",
          message: form.message,
        },
        { publicKey },
      );

      setSent(true);
      setStep(3);
    } catch {
      setError("Something went wrong while sending. Please try again or use WhatsApp.");
    } finally {
      setIsSending(false);
    }
  };

  const fieldClass =
    "w-full rounded-2xl border border-white/14 bg-black/35 px-4 py-3.5 text-sm text-white/92 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] outline-none transition duration-300 placeholder:text-white/35 focus:border-imxGold/65 focus:bg-black/55";
  const labelClass =
    "mb-2 block font-brand text-[0.58rem] tracking-[0.28em] text-imxGold/95 uppercase";

  return (
    <section className="relative overflow-hidden bg-black pb-14 pt-0">
      <div className="relative w-full">
        <section className="relative flex min-h-[calc(100vh-9rem)] items-center overflow-hidden bg-black">
          <div className="absolute inset-0 z-[1]">
            <GlobeComponent />
          </div>
          <div className="pointer-events-none absolute left-0 top-0 z-[2] h-full w-full bg-gradient-to-r from-black via-black/72 to-transparent sm:w-[60%] lg:w-[42%]" />

          <div className="pointer-events-none relative z-[3] mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
            <article className="pointer-events-auto mt-4 max-w-[34rem] py-6 sm:mt-6 sm:py-8 lg:-ml-4 lg:mt-8 lg:py-8">
              <p className="font-brand text-[0.62rem] tracking-[0.3em] text-imxGold uppercase">
                Contact Imxplorer
              </p>
              <h1 className="mt-4 max-w-lg font-serif text-[clamp(1.6rem,3.1vw,2.7rem)] leading-[0.99] text-white">
                Plan a trip worth talking about.
              </h1>
              <p className="mt-4 max-w-xl text-[0.82rem] leading-relaxed text-white/70">
                Share your destination, style, and expectations. Our team handles the logistics,
                timing, and detail so your journey feels effortless from day one.
              </p>

              <div className="mt-8 space-y-3">
                <a
                  href="tel:+919811099951"
                  className="block font-serif text-[2.45rem] text-white/90 transition-colors hover:text-imxGold"
                >
                  +91 98110 99951
                </a>
                <a
                  href="mailto:contact@imxplorer.com"
                  className="block font-sans text-sm text-white/75 transition-colors hover:text-white"
                >
                  contact@imxplorer.com
                </a>
              </div>
            </article>
          </div>
        </section>

        <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-6 px-4 pt-16 sm:px-7 sm:pt-20 lg:px-10 lg:pt-24">
          <section className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-[radial-gradient(120%_120%_at_100%_0%,rgba(204,160,93,0.14),rgba(8,10,14,0.96)_52%)] p-[1px]">
            <div className="pointer-events-none absolute -right-24 top-[-35%] h-80 w-80 rounded-full bg-[#c99b59]/14 blur-3xl" />
            <div className="relative grid rounded-[calc(2rem-1px)] bg-[#07090f]/90 xl:grid-cols-[36%_64%]">
              <aside className="border-b border-white/10 p-6 sm:p-8 xl:border-r xl:border-b-0">
                <p className="font-brand text-[0.58rem] tracking-[0.28em] text-imxGold uppercase">
                  Private Concierge Desk
                </p>
                <h2 className="mt-4 font-serif text-[clamp(1.8rem,3.2vw,2.6rem)] leading-[1.04] text-white">
                  Let&apos;s shape your next journey.
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-white/68">
                  Designed for travelers who want precision, discretion, and seamless execution from
                  planning to return.
                </p>

                <div className="mt-8 space-y-5">
                  <div>
                    <p className="font-brand text-[0.54rem] tracking-[0.28em] text-imxGold uppercase">Call</p>
                    <a
                      href="tel:+919811099951"
                      className="mt-2 block font-serif text-[2.2rem] leading-none text-white/95 transition-colors hover:text-imxGold"
                    >
                      +91 98110 99951
                    </a>
                  </div>
                  <div>
                    <p className="font-brand text-[0.54rem] tracking-[0.28em] text-imxGold uppercase">Email</p>
                    <a
                      href="mailto:contact@imxplorer.com"
                      className="mt-2 block text-sm text-white/78 transition-colors hover:text-white"
                    >
                      contact@imxplorer.com
                    </a>
                  </div>
                  <div>
                    <p className="font-brand text-[0.54rem] tracking-[0.28em] text-imxGold uppercase">Office</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">
                      First Floor, Galaxy Blue Sapphire Plaza, Greater Noida West, UP, India
                    </p>
                  </div>
                </div>

                <a
                  href="https://www.google.com/maps/dir//Gate+No.+1,+IMxplorer+The+Travel+Co.,+Galaxy+Blue+Sapphire+Plaza,+F-37B,+First+Floor,+Greater+Noida+W+Rd,+near+Xero+Degree,+Noida,+Uttar+Pradesh+201309/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x390d03e4ace55555:0x2e3bc39574ba2419?sa=X&ved=1t:57443&ictx=111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex rounded-full border border-white/15 px-5 py-2.5 font-brand text-[0.58rem] tracking-[0.28em] text-white/78 uppercase transition hover:border-imxGold/45 hover:text-white"
                >
                  Find us on map
                </a>

                <div className="mt-8 flex flex-wrap gap-2.5">
                  {["Discreet Handling", "24/7 Support", "Global Partnerships"].map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-white/12 bg-white/[0.03] px-3 py-1.5 font-brand text-[0.52rem] tracking-[0.22em] text-white/62 uppercase"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </aside>

              <div className="p-6 sm:p-8 lg:p-10">
                <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="font-brand text-[0.58rem] tracking-[0.28em] text-imxGold uppercase">
                      Tailored Inquiry
                    </p>
                    <h3 className="mt-2 font-serif text-[2rem] text-white">Tell us what premium means to you.</h3>
                  </div>
                  <p className="max-w-xs text-xs leading-relaxed text-white/54">
                    Every request is personally reviewed by our planning team before any itinerary is shared.
                  </p>
                </div>

                {!sent ? (
                  <form onSubmit={submit} className="mx-auto max-w-3xl space-y-6">
                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <p className="font-brand text-[0.6rem] tracking-[0.28em] text-imxGold uppercase">
                          Step {step} of 3
                        </p>
                        <p className="text-xs text-white/55">{activeInquiry.label}</p>
                      </div>
                      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-imxRed to-imxGold transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      {step === 2 ? (
                        <p className="mt-3 text-xs leading-relaxed text-white/56">
                          {activeInquiry.step2Description}
                        </p>
                      ) : null}
                    </div>

                    {step === 1 && (
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <label className="md:col-span-2">
                          <span className={labelClass}>Inquiry Type</span>
                          <select
                            className={fieldClass}
                            value={form.inquiryType}
                            onChange={(e) => updateField("inquiryType", e.target.value as InquiryType)}
                          >
                            <option value="luxury">Luxury Travel</option>
                            <option value="study">Study Abroad</option>
                            <option value="corporate">Corporate & MICE</option>
                            <option value="visa">Visa Services</option>
                          </select>
                        </label>
                        <label>
                          <span className={labelClass}>Full Name</span>
                          <input
                            className={fieldClass}
                            value={form.name}
                            onChange={(e) => updateField("name", e.target.value)}
                          />
                        </label>
                        <label>
                          <span className={labelClass}>Email</span>
                          <input
                            type="email"
                            className={fieldClass}
                            value={form.email}
                            onChange={(e) => updateField("email", e.target.value)}
                          />
                        </label>
                        <label className="md:col-span-2">
                          <span className={labelClass}>Phone</span>
                          <input
                            className={fieldClass}
                            value={form.phone}
                            onChange={(e) => updateField("phone", e.target.value)}
                          />
                        </label>
                      </div>
                    )}

                    {step === 2 && (
                      <div>
                        <p className="mb-3 font-brand text-[0.56rem] tracking-[0.28em] text-imxGold uppercase">
                          {activeInquiry.step2Heading}
                        </p>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          {activeInquiry.step2Fields.map((field) => (
                            <label key={field.key}>
                              <span className={labelClass}>{field.label}</span>
                              <input
                                type={field.type}
                                min={field.min}
                                className={fieldClass}
                                placeholder={field.placeholder}
                                value={form[field.key]}
                                onChange={(e) => updateField(field.key, e.target.value)}
                              />
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <label>
                        <span className={labelClass}>{activeInquiry.messageLabel}</span>
                        <textarea
                          className={`${fieldClass} min-h-48 resize-y`}
                          placeholder={activeInquiry.messagePlaceholder}
                          value={form.message}
                          onChange={(e) => updateField("message", e.target.value)}
                        />
                      </label>
                    )}

                    {error ? <p className="text-sm text-imxRed">{error}</p> : null}

                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      {step > 1 ? (
                        <button
                          type="button"
                          className="inline-flex rounded-full border border-white/22 px-6 py-2.5 font-brand text-[0.6rem] tracking-[0.28em] text-white/75 uppercase transition hover:border-white/45 hover:text-white"
                          onClick={prevStep}
                        >
                          Back
                        </button>
                      ) : null}

                      {step < 3 ? (
                        <button
                          type="button"
                          className="inline-flex rounded-full border border-imxRed/75 bg-imxRed/22 px-6 py-2.5 font-brand text-[0.6rem] tracking-[0.28em] text-white uppercase transition hover:border-imxRed hover:bg-imxRed/34"
                          onClick={nextStep}
                        >
                          Continue
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="inline-flex rounded-full border border-imxRed/75 bg-imxRed/22 px-6 py-2.5 font-brand text-[0.6rem] tracking-[0.28em] text-white uppercase transition hover:border-imxRed hover:bg-imxRed/34 disabled:cursor-not-allowed disabled:opacity-65"
                          disabled={isSending}
                        >
                          {isSending ? "Sending..." : "Submit Inquiry"}
                        </button>
                      )}
                    </div>
                  </form>
                ) : (
                  <div className="mx-auto max-w-2xl rounded-3xl border border-imxGold/35 bg-imxGold/6 p-8 text-center">
                    <p className="font-brand text-[0.62rem] tracking-[0.28em] text-imxGold uppercase">
                      Sent Successfully
                    </p>
                    <h3 className="mt-3 font-serif text-[2rem] text-white">We have your request.</h3>
                    <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/75">
                      Our team will review your plan and connect shortly with options tailored to your
                      travel goals.
                    </p>
                    <Link
                      href="https://wa.me/919811099951"
                      className="mt-6 inline-flex rounded-full border border-imxGold/40 bg-imxGold/15 px-6 py-2.5 font-brand text-[0.6rem] tracking-[0.28em] text-imxLight uppercase transition hover:bg-imxGold/24"
                    >
                      Continue on WhatsApp
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(160deg,rgba(7,9,14,0.96)_0%,rgba(10,12,17,0.9)_52%,rgba(25,16,10,0.84)_100%)] p-5 sm:p-7 lg:p-8">
            <div className="pointer-events-none absolute -bottom-24 right-[-5%] h-72 w-72 rounded-full bg-[#d3a65a]/12 blur-3xl" />
            <div className="relative">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
                <div>
                  <p className="font-brand text-[0.56rem] tracking-[0.28em] text-imxGold uppercase">
                    Service Signature
                  </p>
                  <h3 className="mt-2 font-serif text-[clamp(1.7rem,3.2vw,2.5rem)] leading-tight text-white">
                    Why clients choose IMxplorer repeatedly
                  </h3>
                </div>
                <p className="max-w-md text-sm leading-relaxed text-white/62">
                  Our work blends concierge precision with on-ground control, so every movement,
                  booking, and fallback stays coordinated end-to-end.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {[
                  {
                    title: "24/7 Assistance",
                    body: "Real-time support during disruptions, delays, and emergency changes with direct operator access.",
                  },
                  {
                    title: "End-to-End Planning",
                    body: "Flights, stays, transfers, visas, and curated experiences aligned into one reliable flow.",
                  },
                  {
                    title: "Discreet Premium Service",
                    body: "Confidential handling, senior-only coordination, and execution standards built for HNI travel.",
                  },
                ].map((card, index) => (
                  <article
                    key={card.title}
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                  >
                    <p className="absolute right-5 top-4 font-serif text-4xl text-white/12">
                      {`0${index + 1}`}
                    </p>
                    <div className="mb-4 h-2 w-2 rounded-full bg-imxGold" />
                    <h4 className="max-w-[90%] font-serif text-xl leading-tight text-white/92">
                      {card.title}
                    </h4>
                    <p className="mt-3 text-sm leading-relaxed text-white/66">{card.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
