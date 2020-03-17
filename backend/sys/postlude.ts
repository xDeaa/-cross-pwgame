 export default function postlude() {
    process.on('SIGUSR2', () => {
        process.exit(0)
    })
}
