import {
  Droplets,
  ShowerHead,
  Wrench,
  Bath,
  Flame,
  Pipette,
  type LucideIcon,
} from 'lucide-react';

export const BUSINESS = {
  name: 'Northstar Plumbing Co.',
  phone: '(416) 555-0148',
  phoneHref: 'tel:+14165550148',
  email: 'demo@northstarplumbing.example',
  emailHref: 'mailto:demo@northstarplumbing.example',
  serviceArea: 'Toronto and the Greater Toronto Area',
  announcement: 'Plumbing service requests across Toronto and the GTA.',
};

export const SERVICE_AREAS: string[] = [
  'Toronto',
  'North York',
  'Scarborough',
  'Etobicoke',
  'Vaughan',
  'Markham',
  'Richmond Hill',
  'Mississauga',
];

export interface ServiceItem {
  id: string;
  label: string;
  icon: LucideIcon;
  description: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'leak-detection-repairs',
    label: 'Leak Detection & Repairs',
    icon: Droplets,
    description:
      'Dripping faucets, hidden leaks, or water stains on ceilings and walls. Tell us where the problem is and we can help identify the source.',
  },
  {
    id: 'drain-cleaning',
    label: 'Drain Cleaning',
    icon: Pipette,
    description:
      'Slow-draining sinks, recurring clogs, or gurgling pipes. Describe the issue and request assistance with clearing residential drains.',
  },
  {
    id: 'faucet-fixture-installation',
    label: 'Faucet & Fixture Installation',
    icon: ShowerHead,
    description:
      'Upgrading a kitchen faucet, installing a new shower fixture, or replacing old hardware. Let us know what you are looking to install.',
  },
  {
    id: 'toilet-repairs-installation',
    label: 'Toilet Repairs & Installation',
    icon: Bath,
    description:
      'Running toilets, weak flushes, or a full replacement. Describe the symptoms and we can review the next steps with you.',
  },
  {
    id: 'water-heater-service',
    label: 'Water Heater Service',
    icon: Flame,
    description:
      'No hot water, inconsistent temperatures, or a tank that is nearing end of life. Tell us what you are experiencing.',
  },
  {
    id: 'general-plumbing-repairs',
    label: 'General Plumbing Repairs',
    icon: Wrench,
    description:
      'Low water pressure, frozen pipes, unusual noises, or something else entirely. Describe the problem and request a callback.',
  },
];

export const FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: 'What plumbing services can I request?',
    answer:
      'You can request help with leak detection and repairs, drain cleaning, faucet and fixture installation, toilet repairs and installation, water heater service, and general residential plumbing repairs. If your issue does not fit one of those categories, select "Other" in the form and describe what you need.',
  },
  {
    question: 'How do I request a quote?',
    answer:
      'Fill out the quote request form on this page with your name, email, the type of service you need, and a short description of the issue. Once you submit, the request is reviewed and you will be contacted to discuss next steps.',
  },
  {
    question: 'Is my appointment confirmed when I submit the form?',
    answer:
      'No. Submitting the form is a request for a callback, not a confirmed appointment or emergency dispatch. A follow-up conversation is needed to confirm timing, scope, and availability before anything is scheduled.',
  },
  {
    question: 'Which areas do you serve?',
    answer:
      'Service requests can be submitted for Toronto and the Greater Toronto Area, including North York, Scarborough, Etobicoke, Vaughan, Markham, Richmond Hill, and Mississauga. Actual service availability is confirmed when the business responds to your request.',
  },
  {
    question: 'What information should I include in my request?',
    answer:
      'Include as much detail as possible: the type of plumbing issue, when it started, any visible damage, and whether it is affecting your daily routine. Photos are not required but the more context you provide, the better the follow-up conversation will be.',
  },
  {
    question: 'What should I do if I have a plumbing emergency?',
    answer:
      'This form is not an emergency dispatch system. If you have an active leak, flooding, or a plumbing emergency, contact a verified local emergency plumbing provider directly. Do not rely on this demo form for urgent situations.',
  },
];

export const HERO_IMAGE =
  'https://images.pexels.com/photos/13821194/pexels-photo-13821194.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800';
export const HERO_IMAGE_ALT =
  'A smiling professional tradesperson in work uniform standing beside a white service van, holding tools, in a residential setting';

export const WHY_IMAGE =
  'https://images.pexels.com/photos/6419128/pexels-photo-6419128.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
