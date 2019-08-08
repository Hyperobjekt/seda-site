---
section: raw-data
---
### Raw Data

The data used to develop SEDA comes from the EDFacts Restricted-Use Files, provided to our team via data use agreement with NCES.

EDFacts provides counts of students scoring in proficiency levels for nearly* every school in the U.S. 

Data are available for:

- School Years 2008-09 through 2015-16
- Grades 3-8
- Math and English Language Arts (ELA)
- Various subgroups of students: all students, racial/ethnic subgroups, gender subgroups, economic subgroups, etc.

The data also contain NCES identifiers, which allow the data to be linked to other databases or combined into different aggregations (e.g., school districts, counties, etc.).

Below is a mock-up of the data format:

<table class="table table-responsive">
<thead><tr><th title="Field #1"></th>
<th title="Field #2"></th>
<th title="Field #3"></th>
<th title="Field #4"></th>
<th title="Field #5"></th>
<th title="Field #6"></th>
<th colspan="4" title="Field #7">Number of Students Scoring at</th>

</tr></thead>
<tbody><tr>
<td>NCES School ID</td>
<td>State FIPS Code</td>
<td>Subgroup</td>
<td>Subject</td>
<td>Grade</td>
<td>Year (Spring)</td>
<td>Proficiency Level 1</td>
<td>Proficiency Level 2</td>
<td>Proficiency Level 3</td>
<td>Proficiency Level 4</td>
</tr>
<tr>
<td>1</td>
<td>A</td>
<td>All students</td>
<td>ELA</td>
<td>3</td>
<td>2009</td>
<td>10</td>
<td>50</td>
<td>100</td>
<td>50</td>
</tr>
<tr>
<td>2</td>
<td>A</td>
<td>All students</td>
<td>ELA</td>
<td>3</td>
<td>2009</td>
<td>0</td>
<td>30</td>
<td>80</td>
<td>40</td>
</tr>
</tbody></table>


*There is a small amount of missing data. For example, during years in which a state was piloting a new test, it may not have reported any data or may not have reported data for all schools to EDFacts. In addition, there are some cases where all students in the state do not take the same test in a given grade-year-subject, as well as some cases where the participation rate in state is too low to allow us to reliable perform estimation (e.g., due to opt out or pilot testing). We do not use or provide data for these states, subjects, grades, and years. For more details, please see TABLE X in the Technical Documentation. 