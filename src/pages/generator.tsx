import { GenericInput } from "@/components/GenericInput";
import { iBodyRequest, iInputValues, iModels } from "@/interfaces/types";
import { Fetch } from "@/utils/api/fetch";
import { useEffect, useState } from "react";

export default function Generator() {

    const inputNames = ['solutionName', 'context', 'entity']

    const [inputValue, setInputValue] = useState<iInputValues>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, value, checked } = e.target;
        let sanitizedValue = value;

        if (inputNames.includes(name) && type === 'text') {
            sanitizedValue = value.replace(/\s/g, '');
        }

        setInputValue((prev: iInputValues) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : sanitizedValue,
        }));
    };

    const GenerateCode = async () => {
        // const response = await Fetch.post('https://anheu-code-generator.azurewebsites.net/GenerateCode', inputValue)
        const bodyRequest = {
            solutionName: inputValue?.solutionName,
            contextName: inputValue?.context,
            isPKGuid: inputValue?.pkGuid,
            models: GenerateModels(inputValue?.entity, inputValue?.properties),
            isGenerateZip: true
        } as iBodyRequest

        const response = await Fetch.download('https://anheu-code-generator.azurewebsites.net/GenerateCode', bodyRequest, 'codeGenerator')
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

    return (
        <main className="flex font-semibold">
            <section className="bg-white flex flex-col grow gap-4 p-6 rounded-md">
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
                    label="Contexto"
                    type="text"
                    name="context"
                    value={inputValue?.context || ''}
                    onChange={handleInputChange}
                    placeholder="EjemploContext..."
                    className="grow"
                />
                <GenericInput
                    label="Clase por defecto"
                    type="text"
                    name="entity"
                    value={inputValue?.entity || ''}
                    onChange={handleInputChange}
                    placeholder="EjemploUsuario..."
                    className="grow"
                />
                <GenericInput
                    label="Propiedades"
                    type="text"
                    name="properties"
                    value={inputValue?.properties || ''}
                    onChange={handleInputChange}
                    placeholder="Ejemplo1 string Ejemplo2 int..."
                    className="grow"
                />
                <GenericInput
                    label="Llave primaria tipo Guid?"
                    type="checkbox"
                    name="pkGuid"
                    checked={inputValue?.pkGuid || false}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <button onClick={GenerateCode} className="font-semibold hover:bg-blue-500 text-lg text-white bg-blue-600 rounded-md outline-none py-1.5 my-10">Generar código</button>
            </section>
            <section className="grow bg-blue-600 text-white">
                <div className="rounded-md flex justify-center items-end">
                    <h2>AAAAAAAAAAAAAAAA</h2>
                </div>
            </section>
        </main>
    )
}