const { globSync } = require('glob')
const { build } = require('vite')
const path = require('path')

const files = globSync('./**/index.ts')
    .map( file => {
        
        const dirname = path.dirname(file)
        const filename = path.basename(file) 
        const name = path.basename(dirname)
        
        return {
            emptyOutDir: false, 
            target: 'es2015',
            outDir: path.resolve(`./${dirname}`),
            lib: {
                name,
                entry: `./${dirname}/${filename}`,
                formats:['umd', 'esm'],
                fileName: (type) => {
                    return type == 'umd' ? 'index.umd.js' : 'index.js' 
                }
            },
            rollupOptions: {
                output: {
                    exports: 'named'
                }
            }   
        } 
    })

files.forEach( async (library) => {
    await build({ build: library })
})