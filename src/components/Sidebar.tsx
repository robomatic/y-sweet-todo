'use client'

import Link from 'next/link'
import { Fragment, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Dialog, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Logo from '../components/Logo'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

type NavLinkProps = {
  href: string
  curRoute?: string
  children: JSX.Element | string
}

function NavLink({ href, curRoute, children }: NavLinkProps) {
  const classes = classNames(
    curRoute && href === curRoute
      ? 'bg-sky-900/75 text-white'
      : 'text-sky-100 hover:text-white hover:bg-sky-800/75',
    'group flex items-center rounded-md text-base transition-all px-8 py-2 my-1 cursor-pointer',
  )
  return (
    <Link href={href}>
      <div className={classes}>{children}</div>
    </Link>
  )
}

function Nav({ curRoute, onClickLink }: { curRoute: string; onClickLink?: () => void }) {
  return (
    <div className="flex flex-col justify-between flex-1 overflow-y-auto pt-5 pb-4">
      <div>
        <Link href="/" className="text-xl font-bold text-sky-100 pb-6 px-6">
          Robomatic
        </Link>
        <nav className="flex-1 text-sm mt-5 px-2">
          <NavLink href="/to-do-list" curRoute={curRoute}>
            To-do List
          </NavLink>
        </nav>
      </div>
    </div>
  )
}

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const curRoute = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <div className="h-screen w-full absolute">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-800/75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-col bg-sky-950 text-white text-bold">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <Nav curRoute={curRoute} onClickLink={() => setSidebarOpen(false)} />
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col relative z-10">
          <div className="flex min-h-0 flex-1 flex-col bg-sky-950/90 w-60 text-white text-bold py-4 rounded-lg m-2">
            <Nav curRoute={curRoute} />
          </div>
        </div>
        <div className="flex flex-1 flex-col lg:pl-64 h-full">
          <div className="sticky top-0 z-10 bg-sky-900 pl-1 py-1 lg:hidden">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-sky-100 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="h-full lg:mt-2 lg:mb-2 ml-2 mr-2 lg:ml-0 overflow-y-auto">{children}</div>
        </div>
      </div>
    </>
  )
}
