"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, Heart, Home, AlertCircle, XCircle } from "lucide-react";

interface VerificationResult {
  verified: boolean;
  amount?: number;
  currency?: string;
  email?: string;
  metadata?: {
    cause?: string;
    causeTitle?: string;
    frequency?: string;
  };
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [isLoading, setIsLoading] = useState(true);
  const [verification, setVerification] = useState<VerificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function verifyPayment() {
      if (!sessionId) {
        setError("No session ID provided");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/verify-session?session_id=${sessionId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Verification failed");
        }

        if (data.verified) {
          setVerification(data);
        } else {
          setError("Payment could not be verified. Please contact us if you believe this is an error.");
        }
      } catch (err) {
        console.error("Verification error:", err);
        setError("Unable to verify payment. Please contact us if you completed a payment.");
      } finally {
        setIsLoading(false);
      }
    }

    verifyPayment();
  }, [sessionId]);

  // Loading state
  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-teal-50 to-white flex items-center justify-center px-6 py-24">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying your donation...</p>
        </div>
      </main>
    );
  }

  // Error state - no session or verification failed
  if (error || !verification) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center px-6 py-24">
        <FadeIn>
          <div className="max-w-lg mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
              className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-8 shadow-lg shadow-red-500/30"
            >
              <XCircle className="w-12 h-12 text-white" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Verification Issue
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-gray-600 mb-8"
            >
              {error || "We couldn't verify your donation."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8"
            >
              <div className="flex items-center justify-center gap-2 text-amber-600 mb-4">
                <AlertCircle className="w-5 h-5" />
                <span className="font-semibold">Need Help?</span>
              </div>
              <p className="text-gray-600 text-sm">
                If you completed a payment and are seeing this message, please contact us at{" "}
                <a href="mailto:contact@australianislamiccentre.org" className="text-teal-600 hover:underline">
                  contact@australianislamiccentre.org
                </a>{" "}
                with your payment details.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                href="/donate"
                variant="primary"
                icon={<Heart className="w-5 h-5" />}
              >
                Try Again
              </Button>
              <Button
                href="/"
                variant="outline"
                icon={<Home className="w-5 h-5" />}
              >
                Return Home
              </Button>
            </motion.div>
          </div>
        </FadeIn>
      </main>
    );
  }

  // Success state - verified payment
  return (
    <main className="min-h-screen bg-gradient-to-b from-teal-50 to-white flex items-center justify-center px-6 py-24">
      <FadeIn>
        <div className="max-w-lg mx-auto text-center">
          {/* Success Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
            className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center mb-8 shadow-lg shadow-teal-500/30"
          >
            <CheckCircle2 className="w-12 h-12 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Thank You for Your Generosity!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-gray-600 mb-8"
          >
            Your donation has been received successfully. May Allah reward you abundantly for your kindness.
          </motion.p>

          {/* Confirmation Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8"
          >
            <div className="flex items-center justify-center gap-2 text-teal-600 mb-4">
              <Heart className="w-5 h-5" />
              <span className="font-semibold">Donation Confirmed</span>
            </div>

            {/* Show donation details */}
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              {verification.amount && (
                <p>
                  <span className="font-medium">Amount:</span> ${verification.amount.toFixed(2)} {verification.currency}
                </p>
              )}
              {verification.metadata?.causeTitle && (
                <p>
                  <span className="font-medium">Cause:</span> {verification.metadata.causeTitle}
                </p>
              )}
              {verification.metadata?.frequency && verification.metadata.frequency !== 'once' && (
                <p>
                  <span className="font-medium">Frequency:</span>{" "}
                  <span className="capitalize">{verification.metadata.frequency}</span>
                </p>
              )}
            </div>

            <p className="text-gray-600 text-sm">
              A confirmation email has been sent to{" "}
              {verification.email ? (
                <span className="font-medium">{verification.email}</span>
              ) : (
                "your email address"
              )}.
              You will receive a tax-deductible receipt shortly.
            </p>
          </motion.div>

          {/* Islamic Reminder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-teal-50 rounded-xl p-4 mb-8 text-sm text-teal-800 italic"
          >
            &ldquo;The example of those who spend their wealth in the way of Allah is like a seed of grain that sprouts seven ears; in every ear there are a hundred grains.&rdquo;
            <span className="block mt-2 font-semibold not-italic">— Quran 2:261</span>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              href="/donate"
              variant="primary"
              icon={<Heart className="w-5 h-5" />}
            >
              Donate Again
            </Button>
            <Button
              href="/"
              variant="outline"
              icon={<Home className="w-5 h-5" />}
            >
              Return Home
            </Button>
          </motion.div>

          {/* Share */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 text-sm text-gray-500"
          >
            Share the reward — encourage others to donate by sharing our cause.
          </motion.p>
        </div>
      </FadeIn>
    </main>
  );
}

export default function DonationSuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-gradient-to-b from-teal-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Processing your donation...</p>
        </div>
      </main>
    }>
      <SuccessContent />
    </Suspense>
  );
}
