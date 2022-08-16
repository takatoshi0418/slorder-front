<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="projectList"
      :search="filterValue"
      :custom-filter="filterOnlyCapsText"
      :page.sync="page"
      :items-per-page=10
      @page-count="pageCount = $event"
      hide-default-footer
      class="secondary primary--text">
      <template v-slot:top>
        <v-container class="mb-5">
          <v-row>
            <v-text-field
              v-model="filterValue"
              :label="$t('common.project_serch')" />
            <v-spacer />
          </v-row>
          <v-row>
            <v-checkbox 
              v-model="selectAllStatus.checked"
              @change="changeCheckBox(selectAllStatus.id)"
              class="mr-3">
              <template v-slot:label>
                <span class="primary--text">{{selectAllStatus.label}}</span>
              </template>
            </v-checkbox>
            <v-checkbox 
              v-for="select of selectOtherStatus"
              :key="select.id"
              v-model="select.checked"
              @change="changeCheckBox(select.id)"
              class="mr-3">
              <template v-slot:label>
                <span class="primary--text">{{select.label}}</span>
              </template>
            </v-checkbox>
          </v-row>
          <v-row>
            <v-spacer />
            <v-btn 
              class="primary secondary--text"
              @click="doEdit">
              {{$t('common.project_new_receive')}}
            </v-btn>
          </v-row>
        </v-container>
      </template>
      <template v-if="isEnabled()" v-slot:item="{item}">
        <tr>
          <td :class="item.isEnabled? '' : 'greyout secondary--text'" @click="doEdit(item.project_no)">{{item.project_no}}</td>
          <td :class="item.isEnabled? '' : 'greyout secondary--text'">{{item.project_name}}</td>
          <td :class="item.isEnabled? '' : 'greyout secondary--text'">{{item.client_name}}</td>
          <td :class="item.isEnabled? 'text-center' : 'greyout secondary--text text-center'">{{item.status}}</td>
        </tr>
      </template>
    </v-data-table>
    <v-pagination
      v-model="page"
      :length="pageCount" />
  </v-container>
</template>
<script>
  export default {
    name: 'OrderListView',
    data: function() {
      return {
        page: 1,
        pageCount: 0,
        filterValue: '',
        projectList: projectList,
        selectAllStatus: {label: this.$t('project_status.all'), id: 0, checked: false},
        selectOtherStatus: this.$projectStatus
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
                  if (value === selectStatus.label) {
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
        if (!value || typeof value !== 'string') {
          return false;
        }

        if (value.indexOf(search) !== -1 || value.indexOf(search) !== -1) {
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
      doEdit: function(project_no) {
        project_no
        this.$router.replace({name: 'orderEdit'})
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
  const projectList = [
    {
      project_no : 'P-20220301-0001',
      project_name: 'ペット行動管理システム',
      client_name: 'ポメラニアン佐藤', 
      status: '見積中',
      isEnabled: true
    },
    {
      project_no : 'P-20220301-0002',
      project_name: '野菜在庫管理システム',
      client_name: '三日月農協組合', 
      status: '受注済',
      isEnabled: true
    },
    {
      project_no : 'P-20220301-0003',
      project_name: '売上管理システム',
      client_name: '山田商店', 
      status: '納品済',
      isEnabled: true
    },
    {
      project_no : 'P-20220301-0004',
      project_name: '文具在庫管理システム',
      client_name: '田中文具店', 
      status: '検収確認済',
      isEnabled: true
    },
    {
      project_no : 'P-20220301-0005',
      project_name: '顧客管理システム',
      client_name: 'スズキ薬局', 
      status: '入金確認済',
      isEnabled: false
    },
    {
      project_no : 'P-20220301-0006',
      project_name: '帳票管理システム',
      client_name: '三日月市', 
      status: '失注',
      isEnabled: false
    },
  ]
</script>