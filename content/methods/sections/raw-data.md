---
section: raw-data
private: true
---
### Raw data

The data used to develop SEDA come from the ED<i>Facts</i> Restricted-Use Files, provided to our team via a data-use agreement with NCES.

ED<i>Facts</i> provides the counts of students scoring in proficiency levels for nearly every school in the U.S.

From the data provided, we use data for:

- All 50 state and DC
- School years 2008-09 through 2017-18
- Grades 3-8
- Math and Reading Language Arts (RLA)
- Various subgroups of students: all students, racial/ethnic subgroups, gender subgroups, economic subgroups, etc.

For details on missing data, see the <a href="/papers/SEDA_documentation_v30_DRAFT09212019.pdf" target="_blank" rel="noopener noreferrer">SEDA Technical Documentation</a>.

The data also contain NCES identifiers, which allow the information to be linked to other databases or combined into different aggregations (e.g., school districts, counties, etc.). Because schools, districts, counties, commuting zones, and metropolitan statistical areas occasionally change NCES IDs over the years in our data, we developed SEDA IDs that are stable over time. In other words, if the same school was identified by two different NCES IDs in EDFacts, we assign it a single SEDA School ID. Using their stable SEDA IDs, we assign each school to a school district, county, commuting zone, metropolitan statistical area, and state based on their geographic location. For example, if a school is physically located inside the boundary of a school district, it is assigned that school district’s SEDA ID. Special education schools are not assigned to districts, counties, commuting zones, or metropolitan statistical areas. See the <a href="/help-faq/" target="_blank" rel="noopener noreferrer">FAQs</a> and the <a href="https://stacks.stanford.edu/file/druid:db586ns4974/seda_documentation_4.0.pdf" target="_blank" rel="noopener noreferrer">SEDA Technical Documentation</a> for more details. You can also use the published crosswalk on our <a href="/get-the-data/" target="_blank" rel="noopener noreferrer">Get The Data</a> page to see what schools are assigned to each higher aggregation.

Below is a mock-up of the data format:
