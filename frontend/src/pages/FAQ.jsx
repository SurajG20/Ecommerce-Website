import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Layout from "@/components/Layout";
const FAQ = () => {
  const faqItems = [
    {
      question: "How do I place an order?",
      answer:
        "To place an order, simply browse our products, add items to your cart, and proceed to checkout. You'll need to create an account or log in, provide shipping details, and complete the payment process.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept various payment methods including credit/debit cards (Visa, MasterCard, American Express), PayPal, and other digital payment options. All payments are processed securely.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for most items. Products must be unused and in their original packaging. Please contact our customer service team to initiate a return.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Shipping times vary depending on your location and chosen shipping method. Standard shipping typically takes 3-5 business days, while express shipping can take 1-2 business days.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes, we offer international shipping to most countries. Shipping costs and delivery times vary by location. Please check our shipping calculator at checkout for specific details.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order ships, you'll receive a tracking number via email. You can use this number to track your package on our website or through the carrier's website.",
    },
    {
      question: "Are my payment details secure?",
      answer:
        "Yes, we use industry-standard encryption and security measures to protect your payment information. We never store your complete credit card details on our servers.",
    },
    {
      question: "What if I receive a damaged item?",
      answer:
        "If you receive a damaged item, please contact our customer service team immediately with photos of the damage. We'll arrange a replacement or refund as soon as possible.",
    },
  ];

  return (
    <Layout>

    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h1>
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-4">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
              </Layout>
  );
};

export default FAQ;