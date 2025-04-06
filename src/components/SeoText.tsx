// SEOテキスト用のインターフェース
export interface SeoTextContent {
  overview: {
    title: string;
    content: string;
  };
  howTo: {
    title: string;
    steps: {
      title: string;
      description: string;
    }[];
  };
  testimonials: {
    title: string;
    users: {
      name: string;
      comment: string;
    }[];
  };
  features: {
    title: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  faq: {
    title: string;
    questions: {
      question: string;
      answer: string;
    }[];
  };
}

interface SeoTextProps {
  content: SeoTextContent;
  className?: string;
}

export default function SeoText({ content, className = '' }: SeoTextProps) {
  return (
    <div className={`mt-16 text-gray-100 ${className}`}>
      {/* 概要セクション */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          {content.overview.title}
        </h2>
        <p className="text-gray-300 whitespace-pre-line">{content.overview.content}</p>
      </div>

      {/* 使い方セクション */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">
          {content.howTo.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.howTo.steps.map((step, index) => (
            <div key={`step-${index}`} className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">
                {step.title}
              </h3>
              <p className="text-gray-300">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ユーザーの声セクション */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">
          {content.testimonials.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.testimonials.users.map((user, index) => (
            <div key={`testimonial-${index}`} className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">
                {user.name}
              </h3>
              <p className="text-gray-300">{user.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 特徴・メリットセクション */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">
          {content.features.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.features.items.map((feature, index) => (
            <div key={`feature-${index}`} className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQセクション */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">
          {content.faq.title}
        </h2>
        <div className="space-y-4">
          {content.faq.questions.map((qa, index) => (
            <div key={`faq-${index}`} className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">
                {qa.question}
              </h3>
              <p className="text-gray-300 whitespace-pre-line">{qa.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
