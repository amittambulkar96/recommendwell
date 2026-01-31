export default function FAQs() {
    return (
        <section id="faqs" className="scroll-py-16 py-16 md:scroll-py-32 md:py-32">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid gap-y-12 px-2 lg:[grid-template-columns:1fr_auto]">
                    <div className="text-center lg:text-left">
                        <h2 className="mb-4 text-3xl font-semibold md:text-4xl">
                            Frequently <br className="hidden lg:block" /> Asked <br className="hidden lg:block" />
                            Questions
                        </h2>
                        <p>Everything you need to know before you hit send.</p>
                    </div>

                    <div className="divide-y divide-dashed sm:mx-auto sm:max-w-lg lg:mx-0">
                        <div className="pb-6">
                            <h3 className="font-medium">What do I need to start a letter?</h3>
                            <p className="text-muted-foreground mt-4">A resume, a few bullet points, or a performance review is enough. RecommendWell structures the evidence and gives you a draft you can edit.</p>

                            <ol className="list-outside list-decimal space-y-2 pl-4">
                                <li className="text-muted-foreground mt-4">Upload a resume or paste notes.</li>
                                <li className="text-muted-foreground mt-4">Pick the audience, tone, and length.</li>
                                <li className="text-muted-foreground mt-4">Refine and export when it sounds right.</li>
                            </ol>
                        </div>
                        <div className="py-6">
                            <h3 className="font-medium">Can I edit the letter before sending?</h3>
                            <p className="text-muted-foreground mt-4">Absolutely. Every paragraph is editable, and you can request alternate phrasings until it matches your voice.</p>
                        </div>
                        <div className="py-6">
                            <h3 className="font-medium">How do bias checks work?</h3>
                            <p className="text-muted-foreground my-4">We flag potentially biased or vague language and suggest clearer, more equitable alternatives.</p>
                            <ul className="list-outside list-disc space-y-2 pl-4">
                                <li className="text-muted-foreground">You can accept, edit, or ignore suggestions.</li>
                                <li className="text-muted-foreground">We never rewrite without your approval.</li>
                            </ul>
                        </div>
                        <div className="py-6">
                            <h3 className="font-medium">Is my data private?</h3>
                            <p className="text-muted-foreground mt-4">Yes. Your drafts and uploads stay private, and you can delete your data at any time from your account.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
