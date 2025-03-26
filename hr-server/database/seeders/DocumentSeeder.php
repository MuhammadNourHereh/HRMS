<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class DocumentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        DB::table('documents')->insert([
            [
                'employee_id' => 4,
                'file_type' => 'pdf',
                'file_url' => '/storage/employee_documents/4/employment_contract.pdf',
                'file_description' => 'Employment Contract',
                'upload_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'employee_id' => 5,
                'file_type' => 'xlsx',
                'file_url' => '/storage/employee_documents/5/payroll.xlsx',
                'file_description' => 'Payroll Details',
                'upload_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'employee_id' => 6,
                'file_type' => 'pdf',
                'file_url' => '/storage/employee_documents/6/company_policy.pdf',
                'file_description' => 'Company Policy',
                'upload_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'employee_id' => 7,
                'file_type' => 'png',
                'file_url' => '/storage/employee_documents/7/id_card.png',
                'file_description' => 'Employee ID Card',
                'upload_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'employee_id' => 8,
                'file_type' => 'jpg',
                'file_url' => '/storage/employee_documents/8/training_certificate.jpg',
                'file_description' => 'Training Certificate',
                'upload_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'employee_id' => 9,
                'file_type' => 'docx',
                'file_url' => '/storage/employee_documents/9/performance_report.docx',
                'file_description' => 'Performance Report',
                'upload_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'employee_id' => 10,
                'file_type' => 'pdf',
                'file_url' => '/storage/employee_documents/10/handbook.pdf',
                'file_description' => 'Employee Handbook',
                'upload_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'employee_id' => 11,
                'file_type' => 'jpg',
                'file_url' => '/storage/employee_documents/11/certificate.jpg',
                'file_description' => 'Certification Document',
                'upload_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'employee_id' => 12,
                'file_type' => 'docx',
                'file_url' => '/storage/employee_documents/12/promotion_letter.docx',
                'file_description' => 'Promotion Letter',
                'upload_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'employee_id' => 13,
                'file_type' => 'png',
                'file_url' => '/storage/employee_documents/13/badge.png',
                'file_description' => 'Employee Badge',
                'upload_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'employee_id' => 14,
                'file_type' => 'pdf',
                'file_url' => '/storage/employee_documents/14/workshop_material.pdf',
                'file_description' => 'Workshop Material',
                'upload_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'employee_id' => 15,
                'file_type' => 'xlsx',
                'file_url' => '/storage/employee_documents/15/salary_slip.xlsx',
                'file_description' => 'Salary Slip',
                'upload_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}