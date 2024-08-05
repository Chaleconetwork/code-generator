export interface iInputProps {
    label: string;
    type: string;
    name: string;
    checked?: boolean;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
}

export interface iBodyRequest {
    solutionName?: string;
    contextName?: string;
    isPKGuid?: boolean;
    models?: iModels[];
    isGenerateZip: boolean;
}

export interface iModels {
    name?: string;
    props?: string;
}

export interface iInputValues {
    solutionName?: string;
    context?: string;
    pkGuid?: boolean;
    entity?: string;
    properties?: string;
}