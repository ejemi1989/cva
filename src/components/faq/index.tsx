import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'

const faqs = [
  {
    question: "What is AI Chat History?",
    answer: "AI Chat History is a tool that allows you to save, organize, and review your conversations with AI chatbots. It helps you keep track of important information and insights from your AI interactions."
  },
  {
    question: "How do I start saving my chat history?",
    answer: "To start saving your chat history, simply log in to your account and begin chatting with an AI. Your conversations will be automatically saved and organized for you to review later."
  },
  {
    question: "Is my chat history private and secure?",
    answer: "Yes, your chat history is private and secure. We use industry-standard encryption to protect your data, and we never share your personal information or chat history with third parties."
  },
  {
    question: "Can I delete my chat history?",
    answer: "Absolutely. You can delete individual conversations or your entire chat history at any time from your account settings."
  },
  {
    question: "How long is my chat history stored?",
    answer: "Your chat history is stored indefinitely unless you choose to delete it. You can access your past conversations at any time as long as you maintain an active account."
  },
  {
    question: "Can I export my chat history?",
    answer: "Yes, we offer an export feature that allows you to download your chat history in various formats, including PDF and JSON."
  },
  {
    question: "Is there a limit to how much chat history I can save?",
    answer: "The amount of chat history you can save depends on your subscription plan. Free accounts have a limited storage capacity, while premium plans offer more extensive storage options."
  },
  {
    question: "Can I share my chat history with others?",
    answer: "Currently, direct sharing of chat history is not available to protect your privacy. However, you can export your history and share it manually if you choose to do so."
  },
  {
    question: "How can I organize my chat history?",
    answer: "You can organize your chat history using tags, folders, or by searching for specific keywords or dates. We provide tools to help you categorize and find your conversations easily."
  },
  {
    question: "What if I forget my password?",
    answer: "If you forget your password, you can use the 'Forgot Password' link on the login page to reset it. We'll send you instructions to create a new password via your registered email address."
  }
]

export default function FAQ() {
  return (
    <div className="w-full px-4 pt-16">
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
        {faqs.map((faq, index) => (
          <Disclosure key={index} as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>{faq.question}</span>
                  <ChevronUpIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-purple-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  {faq.answer}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  )
}