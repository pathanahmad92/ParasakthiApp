import Vue from 'vue'
import Router from 'vue-router'
import DepartmentComponent from '../components/department'
import StudentComponent from '../components/student'
import InvoiceGeneratorComponent from '../components/invoicegenerator'

import TruckComponent from '../components/truck'
import FirmComponent from '../components/firm'

Vue.use(Router)

export default new Router(
    {
        routes : [
            {
                name : 'trucks',
                path : '/trucks',
                component : TruckComponent
            },
            {
                name : 'firms',
                path : '/firms',
                component : FirmComponent
            },            
            {
                name : 'invoicegenerator',
                path : '/invoicegenerator',
                component : InvoiceGeneratorComponent
            },
            {
                name : 'departments',
                path : '',
                component : DepartmentComponent
            },
            {
            name : 'departments',
            path : '/departments',
            component : DepartmentComponent
            },
            {
                name : 'students',
                path : '/students',
                component : StudentComponent
            }
        ]
    }
);