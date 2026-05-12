import { RequiredDataFromCollectionSlug } from 'payload'

export const aboutStaticData: () => RequiredDataFromCollectionSlug<'pages'> = () => ({
  slug: 'about',
  _status: 'published',
  title: 'About us',
  hero: {
    type: 'none',
  },
  layout: [
    {
      blockName: 'About',
      blockType: 'aboutEditable',
      eyebrow: 'Butcher shop & kitchen',
      quote: 'About us',
      heritageEyebrow: 'What we do',
      heritageTitle: 'Discover more about our work',
      heritageBody:
        'Our team is committed to delivering high-quality meat and hospitality tailored to your table. With years of experience and a passion for excellence, we focus on cuts, curing, and service that truly make a difference. We believe in strong relationships with farms and guests—built on trust and clear communication.',
      standardsEyebrow: 'Explore our world',
      standardsTitle: 'Solutions made for your needs',
      standardsBody:
        'At the core of our mission is a deep commitment to excellence and guest satisfaction. We work tirelessly to provide thoughtful options—from everyday staples to celebration roasts—so every detail reflects care.',
      standards: [
        { title: 'Comfort cuts', body: 'Reliable favorites for weeknight dinners and family meals.' },
        { title: 'Daily favorite', body: 'What we are cooking ourselves: peak-season picks at the counter.' },
        { title: 'Basic box', body: 'A simple bundle of essentials to stock your fridge with confidence.' },
        { title: 'Classic set', body: 'Traditional roasts and chops, trimmed the old-fashioned way.' },
        { title: 'Essential pack', body: 'Ground, steaks, and braising cuts chosen for versatility.' },
        { title: 'The simple one', body: 'One perfect centerpiece—tell us the occasion and we will match it.' },
      ],
      ageBadge: 'High quality standards',
      butchersEyebrow: 'Tailored for you',
      butchersTitle: 'We help your table shine',
      butchersBody:
        'We pride ourselves on personalized guidance that helps you reach your goals—whether you are feeding a crowd or mastering your first rib roast. Every visit is approached with dedication and attention to detail. Our focus is always on quality, reliability, and satisfaction.',
      features: [
        {
          title: 'Exceptional customer care',
          body: 'Professional advice tailored to your menu, budget, and cooking style.',
        },
        {
          title: 'Reliable service',
          body: 'Consistent cuts, honest answers, and support when you need a last-minute fix.',
        },
        {
          title: 'Attention to detail',
          body: 'Trimming, tying, and aging handled with the same rigor we demand at our own table.',
        },
      ],
      partnersEyebrow: 'Smart and simple',
      partnersTitle: 'Creative ideas for discerning guests',
      partners: [
        { name: 'John Miller' },
        { name: 'Emily Johnson' },
        { name: 'Michael Smith' },
        { name: 'Our floor team' },
      ],
      ctaTitle: 'Bridging connections',
      ctaBody:
        'Exceptional service starts with a conversation. Visit us, call the shop, or send a message—we value your feedback and are eager to help with orders, events, or partnerships.',
      primaryButtonLabel: 'Learn more',
      primaryButtonUrl: '/shop',
      secondaryButtonLabel: 'Contact us',
      secondaryButtonUrl: '/contact',
    },
  ],
  meta: {
    title: 'About us',
    description: 'Learn about our butcher shop and values.',
  },
})
