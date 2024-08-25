interface ISMTP {
        user: string,
        pass: string,
        host: string,
        port: number,
        secure: boolean
}


interface ISIGNIN{
        accessTokenPrivateKey:string,
        refreshTokenPrivateKey:string,
}