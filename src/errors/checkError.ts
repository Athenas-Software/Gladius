import { Warning } from "."

export const checkError = ({ error, defaultMessage, defaultCode }: {
    error: unknown,
    defaultMessage: string,
    defaultCode: number
}) => {
    if (error instanceof Warning) {
        throw new Warning(error.message, error.code)
    }

    throw new Warning(defaultMessage, defaultCode)
}