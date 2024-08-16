interface Props {
    title: string
    parag: string
    exa: string
}

export const Example: React.FC<Props> = ({title, parag, exa}) => {
    return (
        <div>
            <h3 className="font-bold mb-4 mt-10 text-xl">{title}</h3>
            <p className="mb-4">{parag}</p>
            <span className="px-2 shadow-sm shadow-blue-600 py-1 rounded-lg"><span className="font-bold">Ejemplo</span>: {exa}</span>
        </div>
    )
}