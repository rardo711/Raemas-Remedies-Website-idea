/**
 * Brand-level copy and constants. Same rules as products.js: nothing here is
 * invented, and empty strings mean "not known yet" rather than "write
 * something plausible".
 */

export const site = {
  name: "RaeMa's Remedies",
  motto: 'Tallow · Herbs · Home · Health',
  tagline: 'Handcrafted tallow skincare and herbal remedies',
  location: 'Tattnall County, Georgia',
  maker: 'Rachael Harrelson',

  // Her printed flyer's own lines, transcribed word for word. The script
  // ones render in the handwriting face — they're her voice, not ours.
  flyer: {
    script: 'Handcrafted with nature. Made with love.',
    motto: 'Local Grown · Handcrafted · Small Batch Wellness',
    whyChoose: "Why Choose RaeMa's Remedies?",
    footerLine: 'Local Grown · Handcrafted · Made with Love',
    thanks: 'Thank you for supporting small, local & handmade!',
  },

  // TODO: replace with the real Facebook page URL. Anything falsy hides the
  // link everywhere it appears, so the site never ships a dead link.
  facebookUrl: '',

  // TODO (Formspree): create a form at https://formspree.io, then paste the
  // endpoint here. While this is empty, the order form stays entirely
  // client-side and shows a success state without sending anything.
  formspreeEndpoint: '',
}

export const whyChoose = [
  'Handcrafted in Georgia',
  'Small Batch',
  'Quality Ingredients',
  'Family Owned',
]

export const stockist = {
  name: "Frog's Farm & Feed",
  city: 'Collins, Georgia',
}

export const disclaimer =
  'These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any disease.'
