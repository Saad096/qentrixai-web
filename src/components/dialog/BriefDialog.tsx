"use client";

import { Modal } from "./Modal";
import { ContactForm } from "@/components/forms/ContactForm";

/**
 * The brief form, in a dialog. Same component and same /api/contact endpoint
 * as /contact -- there is one form on this site, not two that can drift.
 */
export function BriefDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Send us a brief"
      description="What you are building and what is in the way. We read every one and reply ourselves."
    >
      <div className="px-6 py-6 md:px-8">
        <ContactForm />
      </div>
    </Modal>
  );
}
