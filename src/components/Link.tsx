export function Link(props: { href: string; children: React.ReactNode }) {
  return (
    <a href={props.href} className="text-sky-700 hover:text-sky-600 transition-colors underline">
      {props.children}
    </a>
  )
}
