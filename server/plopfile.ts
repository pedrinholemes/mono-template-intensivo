import { spawn } from 'child_process'
import { NodePlopAPI } from 'plop'

export default function PlopFunction(plop: NodePlopAPI): void {
  plop.setWelcomeMessage('Welcome to Plop.JS')
  let tableNameIsPrimary = true
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
        name: 'tableName',
        message: 'table name',
        transformer: (value: string, answers, _) => {
          const name = answers.name.toLowerCase()
          if (tableNameIsPrimary) {
            tableNameIsPrimary = false
            value = name
            return `${value}s`
          } else {
            return value
          }
        }
      }
    ],
    actions: [
      {
        type: 'add',
        path: './src/entities/{{name}}.ts',
        templateFile: './plop-templates/entity.hbs',
        skipIfExists: true
      },
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
