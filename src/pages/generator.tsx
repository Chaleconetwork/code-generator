import { Example } from "@/components/Example";
import { GenericInput } from "@/components/GenericInput";
import { iBodyRequest, iInputValues, iModels } from "@/interfaces/types";
import { Fetch } from "@/utils/api/fetch";
import { useEffect, useState } from "react";

export default function Generator() {

    const inputNames = ['solutionName', 'context', 'entity']

    const [inputValue, setInputValue] = useState<iInputValues>({});
    const [models, setModels] = useState<iModels[]>([])

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
            isPKGuid: inputValue?.pkGuid || false,
            models: models,
            isGenerateZip: true
        } as iBodyRequest

        console.log(bodyRequest)

        const response = await Fetch.download('https://anheu-code-generator.azurewebsites.net/GenerateCode', bodyRequest, 'codeGenerator')
        return response;
    }

    function GenerateModels(): iModels[] {
        const model = {
            name: inputValue?.entity || '',
            props: inputValue?.properties || ''
        } as iModels

        models.push(model);
        setInputValue((prev) => ({...prev, entity: '', properties: ''}))
        console.log(models)
        return models;
    }

    return (
        <main className="flex font-semibold h-full">
            <section className="bg-white flex flex-col grow gap-4 p-6 rounded-lg m-16">
                <GenericInput
                    label="Nombre de la solución"
                    type="text"
                    name="solutionName"
                    value={inputValue?.solutionName || ''}
                    onChange={handleInputChange}
                    className="shadow-md"
                />
                <GenericInput
                    label="Contexto"
                    type="text"
                    name="context"
                    value={inputValue?.context || ''}
                    onChange={handleInputChange}
                    className="shadow-md"
                />
                <div className="flex flex-col gap-8 shadow-md rounded-lg p-4">
                    <div className="flex justify-end shadow-sm p-2 rounded-md">
                        <button onClick={GenerateModels} className="text-3xl rounded-md px-2 bg-blue-600 text-white">+</button>
                    </div>

                    <GenericInput
                        label="Clase por defecto"
                        type="text"
                        name="entity"
                        value={inputValue?.entity || ''}
                        onChange={handleInputChange}
                        className="shadow-md"
                    />
                    <GenericInput
                        label="Propiedades"
                        type="text"
                        name="properties"
                        value={inputValue?.properties || ''}
                        onChange={handleInputChange}
                        className="shadow-md"
                    />
                    <GenericInput
                        label="Llave primaria tipo Guid?"
                        type="checkbox"
                        name="pkGuid"
                        checked={inputValue?.pkGuid || false}
                        onChange={handleInputChange}
                        className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                </div>
                <button onClick={GenerateCode} className="font-semibold hover:bg-blue-500 text-lg text-white bg-blue-600 rounded-md outline-none py-1.5 my-10">Generar código</button>
            </section>
            <section className="grow rounded-lg bg-white p-4 m-16">
                <h2>Vista previa del JSON</h2>
                <pre className="delay-200">
                    {
                        models && JSON.stringify(models, null, 2)
                    }
                </pre>
                {/* <h2 className="text-2xl mb-6">Instrucciones de uso</h2>
                <Example
                    title='Clases o Entidades'
                    parag="Puedes crear las clases que ya tienes en mente para ahorrar tiempo, si deseas agregar
                    más clases puedes dar click en el boton +."
                    exa="Usuario/Cliente"
                />
                <Example
                    title='Propiedades'
                    parag="Puedes crear las propiedades que quieras, escribiendo el nombre de la propiedad + espacio + el tipo de dato, si es más de una, debes separarlos por coma como se muestra en el ejemplo."
                    exa="Nombre string, Edad int"
                />
                <Example
                    title='Primary Keys'
                    parag="Las clases o entidades por defecto se crean con tipo int, puedes cambiarlas a tipo Guid si deseas seleccinando el checkbox."
                    exa=""
                /> */}
            </section>
        </main>
    )
}