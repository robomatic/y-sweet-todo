export default function Paragraph(props: { children: React.ReactNode }) {
  return <p className="text-sky-950 text-lg max-w-prose">{props.children}</p>
}
