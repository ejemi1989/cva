import { onGetBlogPosts } from '@/actions/landing'
import NavBar from '@/components/navbar'
import Footer from '@/components/footer'

import { Button } from '@/components/ui/button'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { pricingCards } from '@/constants/landing-page'
import clsx from 'clsx'
import { ArrowRightCircleIcon, Check } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import parse from 'html-react-parser'
import { getMonthName } from '@/lib/utils'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
0

export default async function Home() {
  const posts:
    | {
        id: string
        title: string
        image: string
        content: string
        createdAt: Date
      }[]
    | undefined = await onGetBlogPosts()
  console.log(posts)

  return (
    <main>
      <NavBar />
      <section>
        <div className="flex items-center justify-center flex-col mt-[80px] gap-4 ">
          <span className="text-blue-500 bg-gray-100 px-4 py-2 rounded-full text-sm">
            An AI powered sales assistant chatbot
          </span>
          <Image
            src="/images/corinna-ai-logo.png"
            width={500}
            height={100}
            alt="Logo"
            className="max-w-lg object-contain"
          />
          <p className="text-center max-w-[500px]">
            Your AI powered sales assistant! Embed Corinna AI into any website
            with just a snippet of code!
          </p>
          <Link href="/dashboard">
            <Button className="bg-blue-900  hover:bg-[#740250] font-bold text-white px-4">
              Start For Free
            </Button>
          </Link>
          <Image
            src="/images/Marketing-bro.png"
            width={700}
            height={400}
            alt="Logo"
            className="max-w-lg object-contain"
          />
        </div>
     
       
  
      </section>
      
   
   
      <section id="pricing" className="flex justify-center items-center  flex-col gap-4 mt-10">
        <h2 className="text-4xl text-center">Choose what fits you right</h2>
        <p className="text-muted-foreground text-center max-w-lg">
          Our straightforward pricing plans are tailored to meet your needs. If
          {" you&apos;re"} not ready to commit you can get started for free.
        </p>
     
      
      <div className="flex justify-center gap-5 flex-wrap mt-6 mb-16">
      
   
        {pricingCards.map((card) => (
          <Card
            key={card.title}
            className={clsx('w-[300px] flex flex-col justify-between', {
              'border-2 border-primary': card.title === 'Unlimited',
            })}
          >
            <CardHeader>
              <CardTitle className="text-blue-900">{card.title}</CardTitle>
              <CardDescription>
                {pricingCards.find((c) => c.title === card.title)?.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-4xl font-bold">{card.price}</span>
              <span className="text-muted-foreground">
                <span>/ month</span>
              </span>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4">
              <div>
                {card.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex gap-2"
                  >
                    <Check />
                    <p>{feature}</p>
                  </div>
                ))}
              </div>
              <Link
                href={`/dashbord?plan=${card.title}`}
                className="bg-blue-900  hover:bg-[#740250] border-2 p-2 w-full text-center text-white font-bold rounded-md"
              >
                Get Started
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      </section>

     
      {/* New CTA section */}
      <section className="bg-gray-100 py-16 mt-16">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-4">Ready to boost your sales?</h2>
          <p className="text-xl mb-8">Start using Pyrion AI today and transform your customer interactions!</p>
          <Link href="/dashboard" className="bg-blue-900 hover:bg-[#740250] text-white font-bold py-3 px-6 rounded-full inline-flex items-center">
            Get Started Now
            <ArrowRightCircleIcon className="ml-2" />
          </Link>
          
        </div>
      </section>

{/* FAQ Section */}
<section className="py-16 h-full" >
  <div className="container mx-auto px-4">

    <h2 className="text-4xl font-bold text-center mb-8">Frequently Asked Questions</h2>
 
    <Accordion type="single" collapsible className="max-w-2xl mx-auto">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is Pyrion AI?</AccordionTrigger>
        <AccordionContent>
         Pyrion AI is an AI-powered sales assistant chatbot that can be embedded into any website with just a snippet of code. It helps businesses automate customer interactions and boost sales.
        </AccordionContent>
      </AccordionItem>


      <AccordionItem value="item-2">
        <AccordionTrigger>How do I integrate Pyrion AI into my website?</AccordionTrigger>
        <AccordionContent>
        Simply embed a small code snippet into your site, and Corinna AI will be ready to assist.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>Can I customize Pyrion AI’s responses?</AccordionTrigger>
        <AccordionContent>
        Yes, you can tailor its dialogue to match your brand&apos;s tone and voice.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>What industries can benefit from Pyrion AI?</AccordionTrigger>
        <AccordionContent>
        Corinna AI is suitable for businesses in various industries that require automated customer engagement and lead generation on their websites..
        </AccordionContent>
      </AccordionItem>
      {/* ... other AccordionItems ... */}
    </Accordion>


  </div>
</section>

      <Footer />
    </main>
  )
}
