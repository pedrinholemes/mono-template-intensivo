import { spawn } from 'child_process'
import { NodePlopAPI } from 'plop'

export default function PlopFunction(plop: NodePlopAPI): void {
  plop.setWelcomeMessage('Welcome to Plop.JS')
  plop.setGenerator('entity', {
    description: 'Generate a entity files',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'entity name'
      },
      {
        type: 'input',
        name: 'path',
        message: 'path name',
        transformer(_, d) {
          return String(d.name).toLowerCase()
        }
      }
    ],
    actions: [
      {
        type: 'add',
        path: './src/services/{{name}}Services.ts',
        templateFile: './plop-templates/services.hbs',
        skipIfExists: true
      },
      {
        type: 'add',
        path: './src/repositories/{{name}}Repository.ts',
        templateFile: './plop-templates/repository.hbs',
        skipIfExists: true
      },
      {
        type: 'add',
        path: './src/controllers/{{name}}Controller.ts',
        templateFile: './plop-templates/controller.hbs',
        skipIfExists: true
      },
      {
        type: 'modify',
        path: './src/routes.ts',
        pattern: /(import { [A-Za-z, ]{1,} } from '[A-Za-z./]{1,}'\n)(\nconst routes = Router\(\))/g,
        template: `
        import { {{name}}Controller } from './controllers/{{name}}Controller'
        $1
        $2
        routes.use('/{{name}}', new {{name}}Controller().router)
`
      },
      { type: 'lint' }
    ]
  })

  plop.setActionType('lint', () => {
    return new Promise<string>(resolve => {
      const cmd = spawn('yarn', ['lint'])

      cmd.on('exit', () => resolve(''))
    })
  })
}
