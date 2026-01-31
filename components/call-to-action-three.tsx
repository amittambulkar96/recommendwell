import { Button } from '@/components/ui/button'
import { Calendar, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function StatsSection() {
    return (
        <section>
            <div className="bg-muted py-12">
                <div className="mx-auto max-w-7xl px-6">
                    <h2 className="text-foreground max-w-lg text-balance text-3xl font-semibold lg:text-4xl">
                        <span className="text-muted-foreground">Write with confidence.</span> Deliver letters that land.
                    </h2>
                    <p className="mt-4 text-lg">Start with three free letters, then keep your templates, tone presets, and institution details ready to go.</p>
                    <div className="mt-8 flex gap-3">
                        <Button
                            asChild
                            className="pr-2">
                            <Link href="/signup">
                                Start free
                                <ChevronRight
                                    strokeWidth={2.5}
                                    className="size-3.5! opacity-50"
                                />
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            className="pl-2.5">
                            <Link href="/all-examples">
                                <Calendar
                                    className="!size-3.5 opacity-50"
                                    strokeWidth={2.5}
                                />
                                See examples
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
