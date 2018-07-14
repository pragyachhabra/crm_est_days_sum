# -*- coding: utf-8 -*-
#############################################################################
#
#    Odoo, Open Source Management Solution
#    Copyright (C) 2016-TODAY Linserv Aktiebolag, Sweden (<http://www.linserv.se>).
#
##############################################################################
{
    "name": "CRM Estimated Days Sum",
    "version": "1.0",
    "author": "Linserv AB",
    "category": "Sales",
    "summary": "CRM Estimated Days Sum",
    "website": "www.linserv.se",
    "contributors": [
        'Gediminas Venclova <gediminasv@live.com>'
    ],
    "license": "",
    "depends": ['base', 'crm_lead_estimator'],
    'description': """

        CRM Estimated Days Sum
        
         - Display Total sum on CRM stages
           
    """,
    "demo": [],
    "data": [
        'views/inherited_crm_lead.xml',
        'static/src/xml/assets.xml'
    ],
    "test": [],
    "js": [],
    "css": [],
    "qweb": [
        'static/src/xml/inherited_kanban_template.xml'
    ],
    "installable": True,
    "auto_install": False,
}
