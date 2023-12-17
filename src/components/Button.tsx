export function Button(props: { onClick?: () => void; children?: React.ReactNode; type?: 'button' | 'reset' | 'submit' | undefined  } = { type: "button" }) {
  return (
    <button
      type={props.type}
      className="block rounded-md bg-sky-900 px-3.5 py-2.5 text-center text-sm
              font-semibold text-white shadow-sm hover:bg-sky-900 focus-visible:outline
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-900
              whitespace-nowrap"
    >
      {props.children}
    </button>
  )
}
