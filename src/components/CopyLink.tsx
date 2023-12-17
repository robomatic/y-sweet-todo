'use client'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'

import Title from '@/components/Title'

export default function CopyLink() {
  return (
    <div className="mb-2 text-left items-center text-neutral-500 border-2 border-yellow-200 rounded-lg bg-yellow-50 px-6 py-3">
      <div className="flex justify-between items-center pb-1">
        <Title>Collaborate on this document</Title>
        <div className="flex">
          <button
            className="text-sm flex items-center gap-1 px-3 py-1 rounded-lg bg-sky-950 text-white border transition-all "
            onClick={() => window.open(window.location.href, '_blank')}
          >
            Open link in a new tab
            <ArrowUpRightIcon className="h-4 w-4 font-bold" />
          </button>
        </div>
      </div>
      <div className="pr-2 w-full md:w-3/4">
        To simulate collaborating on this document, open this page in a new window. When you make
        edits in one window, you should see the document updated in the other.
      </div>
    </div>
  )
}
