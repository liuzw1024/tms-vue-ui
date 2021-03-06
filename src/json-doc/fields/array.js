import { Field, ARRAY_KEYWORDS } from './field'

export function parseItems(items) {
  return items.map(item => {
    let obj = { value: item.value, label: item.label }
    if (item.group) {
      obj.group = item.group
    }
    return obj
  })
}

export class FieldArray extends Field {
  constructor(...args) {
    super(...args)

    this.multiple = this.schema.type === 'array'

    this.items = []

    for (const keyword of ARRAY_KEYWORDS) {
      if (this.schema.hasOwnProperty(keyword)) {
        switch (keyword) {
          case 'enum':
            if (!this.type) {
              this.type = 'select'
            }
            if (this.schema.enumGroups && this.schema.enumGroups.length) {
              this.itemGroups = this.schema.enumGroups
            }
            this.itemType = 'option'
            this.items = parseItems(this.schema[keyword])
            break

          case 'oneOf':
            this.type = 'radiogroup'
            this.itemType = 'radio'
            this.value = this.hasOwnProperty('value') ? this.value : ''
            this.items = parseItems(this.schema[keyword])
            break

          case 'anyOf':
            this.type = 'checkboxgroup'
            this.itemType = 'checkbox'
            this.value = Array.isArray(this.value) ? this.value : []
            this.items = parseItems(this.schema[keyword])
            break
        }
      }
    }
    if (!this.type) {
      this.type = this.schema.type
      this.items = []
    }
  }
}
