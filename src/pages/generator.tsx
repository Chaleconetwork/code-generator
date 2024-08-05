import { GenericInput } from "@/components/GenericInput";
import { iBodyRequest, iInputValues, iModels } from "@/interfaces/types";
import { Fetch } from "@/utils/api/fetch";
import { useEffect, useState } from "react";

export default function Generator() {

    const [inputValue, setInputValue] = useState<iInputValues>();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, value, checked } = e.target;
        setInputValue((prev: any) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const GenerateCode = async () => {
        // const response = await Fetch.post('https://anheu-code-generator.azurewebsites.net/GenerateCode', inputValue)
        const aea = {
            solutionName: inputValue?.solutionName,
            contextName: inputValue?.context,
            isPKGuid: inputValue?.pkGuid,
            models: GenerateModels(inputValue?.entity, inputValue?.properties),
            isGenerateZip: true
        } as iBodyRequest
        
        // const response = await Fetch.download('http://localhost:5170/GenerateCode', aea, 'a')
        const response = await Fetch.download('https://anheu-code-generator.azurewebsites.net/GenerateCode', aea, 'aea')
        console.log(aea, response)
        return response;
    }

    function GenerateModels(entity: string | undefined, props: string | undefined): iModels[] {
        const models: iModels[] = [];
        const model = {
            name: entity,
            props: props
        } as iModels
        
        models.push(model);

        return models;
    }

    useEffect(() => {
        // console.log(inputValue)
    }, [inputValue])

    return (
        <main className="h-screen pt-10 w-[50%] mx-auto font-semibold">
            <section className="bg-white mx-auto py-4">
                <h1 className="font-semibold text-2xl text-center">Genera tu código C#</h1>
            </section>
            <section className="bg-white flex flex-col gap-4 mx-auto p-6 rounded-md">
                <GenericInput
                    label="Nombre de la solución"
                    type="text"
                    name="solutionName"
                    value={inputValue?.solutionName || ''}
                    onChange={handleInputChange}
                    placeholder="EjemploApi..."
                    className="grow"
                />
                <GenericInput
                    label="Nombre del contexto"
                    type="text"
                    name="context"
                    value={inputValue?.context || ''}
                    onChange={handleInputChange}
                    placeholder="Contexto..."
                    className="grow"
                />
                <GenericInput
                    label="Llave primaria tipo Guid?"
                    type="checkbox"
                    name="pkGuid"
                    checked={inputValue?.pkGuid || false}
                    onChange={handleInputChange}
                />
                <GenericInput
                    label="Clase"
                    type="text"
                    name="entity"
                    value={inputValue?.entity || ''}
                    onChange={handleInputChange}
                    placeholder="Usuario..."
                    className="grow"
                />
                <GenericInput
                    label="Propiedades"
                    type="text"
                    name="properties"
                    value={inputValue?.properties || ''}
                    onChange={handleInputChange}
                    placeholder="Nombre string Edad int..."
                    className="grow"
                />
                <button onClick={GenerateCode} className="font-semibold hover:bg-purple-500 text-lg text-white bg-purple-600 rounded-sm outline-none px-10 py-2 my-10">Generar código</button>
            </section>
        </main>
    )
}