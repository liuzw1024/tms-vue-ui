<template>
  <div class="json-schema-ui">
    <h3>编辑JSONSchema</h3>
    <div id="myJsonSchema">
      <tms-json-schema ref="myJsonSchema" :schema="jsonSchema" :extendSchema="extendSchema" :on-upload="onUploadFile">
        <template v-slot:extKeywords="props">
          <el-form-item label="不可修改">
            <el-switch v-model="props.schema.readonly"></el-switch>
          </el-form-item>
        </template>
      </tms-json-schema>
    </div>
  </div>
</template>

<script>
import { JsonSchema } from '../../lib'

export default {
  name: 'JsonSchemaUi',
  components: { TmsJsonSchema: JsonSchema },
  data() {
    return {
      jsonSchema: {
        $id: 'https://example.com/card.schema.json',
        $schema: 'http://json-schema.org/draft-07/schema#',
        description:
          'A representation of a person, company, organization, or place',
        type: 'object',
        required: ['familyName', 'givenName'],
        properties: {
          file: {
            readonly: true,
            type: 'array',
            title: '上传图片和文件',
            items: {
              type: 'object',
              properties: {
                name: { title: '名字', type: 'string' },
                url: { title: '地址', type: 'string' },
              },
              format: 'file',
              formatAttrs: {
                accept: 'image/png,image/jpeg',
                size: '20MB',
                limit: 2,
              },
            },
          },
          fn: {
            description: 'Formatted Name',
            type: 'string',
            enum: [],
          },
          familyName: {
            type: 'string',
          },
          givenName: {
            type: 'string',
          },
          additionalName: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          honorificPrefix: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          honorificSuffix: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          nickname: {
            type: 'string',
          },
          url: {
            type: 'string',
          },
          email: {
            type: 'object',
            properties: {
              type: {
                type: 'string',
              },
              value: {
                type: 'string',
              },
            },
          },
          tel: {
            type: 'object',
            properties: {
              type: {
                type: 'string',
              },
              value: {
                type: 'string',
              },
            },
          },
          tz: {
            type: 'string',
          },
          photo: {
            type: 'string',
          },
          logo: {
            type: 'string',
          },
          sound: {
            type: 'string',
          },
          bday: {
            type: 'string',
          },
          title: {
            type: 'string',
          },
          role: {
            type: 'string',
          },
          org: {
            type: 'object',
            properties: {
              organizationName: {
                type: 'string',
              },
              organizationUnit: {
                type: 'string',
              },
            },
          },
        },
      },
      extendSchema: (vm, schema) => {
        vm.$set(schema, 'readonly', schema.readonly || false)
      },
    }
  },
  methods: {
    onUploadFile(file) {
      let result = {'name': file.name, 'url': location.href}
			return Promise.resolve(result)
    },
  }
}
</script>
<style>
.tms-flex .tms-flex__item:last-child {
  flex: 1;
}
</style>
