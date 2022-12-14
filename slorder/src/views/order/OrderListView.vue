<template>
  <v-container v-if="isLoadend">
    <v-data-table
      :headers="headers"
      :items="projectList"
      :search="filterValue"
      :custom-filter="filterOnlyCapsText"
      :page.sync="page"
      :items-per-page="10"
      @page-count="pageCount = $event"
      hide-default-footer
      class="secondary primary--text"
    >
      <template #top>
        <v-container class="mb-5">
          <v-row>
            <v-text-field
              v-model="filterValue"
              :label="$t('common.project_search')"
            />
            <v-spacer />
          </v-row>
          <v-row>
            <v-checkbox 
              v-model="selectAllStatus.checked"
              @change="changeCheckBox(selectAllStatus.id)"
              class="mr-3"
            >
              <template #label>
                <span class="primary--text">{{ selectAllStatus.label }}</span>
              </template>
            </v-checkbox>
            <v-checkbox 
              v-for="select of selectOtherStatus"
              :key="select.id"
              v-model="select.checked"
              @change="changeCheckBox(select.id)"
              class="mr-3"
            >
              <template #label>
                <span class="primary--text">{{ select.label }}</span>
              </template>
            </v-checkbox>
          </v-row>
          <v-row>
            <v-spacer />
            <v-btn 
              class="primary secondary--text"
              @click="doCreate()"
            >
              {{ $t('common.project_new_receive') }}
            </v-btn>
          </v-row>
        </v-container>
      </template>
      <template
        v-if="isEnabled()"
        #item="{item}"
      >
        <tr>
          <td
            :class="item.isEnabled? '' : 'greyout secondary--text'"
            @click="doEdit(item.project_no)"
          >
            {{ item.project_no }}
          </td>
          <td :class="item.isEnabled? '' : 'greyout secondary--text'">
            {{ item.project_name }}
          </td>
          <td :class="item.isEnabled? '' : 'greyout secondary--text'">
            {{ item.client_name }}
          </td>
          <td :class="item.isEnabled? 'text-center' : 'greyout secondary--text text-center'">
            {{ $getProjectStatusLabel(item.status) }}
          </td>
        </tr>
      </template>
    </v-data-table>
    <v-pagination
      v-model="page"
      :length="pageCount"
      circle
      :total-visible="10"
    />
  </v-container>
</template>
<script>

  import {get} from '@/plugins/apiHandler'

  export default {
    name: 'OrderListView',
    data: function() {
      return {
        page: 1,
        pageCount: 0,
        filterValue: '',
        projectList: null,
        selectAllStatus: {label: this.$t('project_status.all'), id: 0, checked: false},
        selectOtherStatus: this.$projectStatus,
        isLoadend: false
      }
    },
    mounted: function() {
      this.$emit('loading', true);
      try {
        get('projectlist').then(response => {
          this.projectList = response.data
          console.log(response.data)
        })
        .catch(err => {
          console.error(err);
        });
      } catch (err) {
        console.error(err);
      }
    },
    computed: {
      headers: function() {
        return [
          {
            text: this.$t('common.project_no'),
            align: 'center',
            value: 'project_no',
            sortable: false,
            class: 'primary secondary--text'
          },
          {
            text: this.$t('common.project_name'),
            align: 'center',
            value: 'project_name',
            sortable: false,
            class: 'primary secondary--text'
          },
          {
            text: this.$t('common.client_name'),
            align: 'center',
            value: 'client_name',
            sortable: false,
            filterable: false,
            class: 'primary secondary--text'
          },
          {
            text: this.$t('common.status'),
            align: 'center',
            value: 'status',
            sortable: false,
            class: 'primary secondary--text',
            filter: value => {
              if (this.selectAllStatus.checked) {
                return true;
              }
              for (let selectStatus of this.selectOtherStatus) {
                if (selectStatus.checked) {
                  if (value === selectStatus.value) {
                    return true
                  }
                }
              }
              return false;
            }
          }
        ]
      }
    },
    methods: {
      filterOnlyCapsText: function(value, search) {
        if (!value) {
          return false;
        }
        let textValue = new String(value)

        if (textValue.indexOf(search) !== -1 || textValue.indexOf(search) !== -1) {
          return true;
        }
        return false;
      },
      changeCheckBox: function(value){
        if (this.selectAllStatus.checked && isOtherCheckboxChecked(this.selectOtherStatus)) {
          if (value === 0) {
            uncheckOtherCheckbox(this.selectOtherStatus);
          } else {
            this.selectAllStatus.checked = false;
          }
          return;
        } 
        if (!this.selectAllStatus.checked && !isOtherCheckboxChecked(this.selectOtherStatus)) {
          toDefaultOtherCheckbox(this.selectOtherStatus);
        }
        return;
      },
      isEnabled: function() {
        if (this.projectList === [] || this.projectList === undefined) {
          return false;  
        }
        return true;
      },
      doEdit: function(projectNo) {
        this.$router.replace({
          name: 'orderEdit',
          params: {
            projectNo: projectNo
          }
        })
      },
      doCreate: function() {
        this.$router.replace({
          name: 'orderEdit',
          params: {
            projectNo: -1
          }
        })
      }
    },
    watch: {
      projectList: {
        handler() {
          this.isLoadend = true
          this.$emit('loading', false);
        },
        deep: true
      }
    }
  }

  function toDefaultOtherCheckbox(selectOtherStatus) {
    for (let checkbox of selectOtherStatus) {
      if (checkbox.id <= 4) {
        checkbox.checked = true;
      } else {
        checkbox.checked = false;
      }
    }
  }
  function uncheckOtherCheckbox(selectOtherStatus) {
    for (let checkbox of selectOtherStatus) {
      checkbox.checked = false;
    }
  }
  function isOtherCheckboxChecked(selectOtherStatus) {
    for (let checkbox of selectOtherStatus) {
      if (checkbox.checked) {
        return true;
      }
    }
    return false;
  }
</script>