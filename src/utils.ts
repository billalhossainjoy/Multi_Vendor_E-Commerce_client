
export const startsWithAny = (pathname: string , prefixes: string[]): boolean => {
    return prefixes.some(path => pathname.startsWith(path))
}