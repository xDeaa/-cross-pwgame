 export default process.on('SIGUSR2', () => {
    process.exit(0)
})
