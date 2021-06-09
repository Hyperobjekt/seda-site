---
section: raw-data
private: true
---
### Raw data

The data used to develop SEDA come from the ED<i>Facts</i> Restricted-Use Files, provided to our team via a data-use agreement with NCES.

ED<i>Facts</i> provides the counts of students scoring in proficiency levels for nearly every school in the U.S.

From the data provided, we use data for:

- All 50 states, DC, and Puerto Rico*
- School years 2008-09 through 2017-18
- Grades 3-8
- Math and Reading Language Arts (RLA)
- Various subgroups of students: all students, racial/ethnic subgroups, gender subgroups, economic subgroups, etc.

*_Though Puerto Rico assessments are used in SEDA, estimates for Puerto Rico students are not yet published in the publicly available data shared via edopportunity.org. Math estimates for Puerto Rico are set to be released in the Fall of 2021._ 

For details on states, grades, or years missing from the data, see the <a href="https://stacks.stanford.edu/file/druid:db586ns4974/seda_documentation_4.1.pdf" target="_blank" rel="noopener noreferrer">SEDA Technical Documentation</a>.

Schools and districts are identified by NCES IDs, which can be linked to other data sources such as the Common Core of Data (CCD). Following the CCD’s guidelines, we create a stable school identifier we call the SEDA school ID. To create stable district identifiers, called SEDA LEA IDs, we use the school’s most recent geographical information and the most recent school district the school was observed in (see the <a href="https://stacks.stanford.edu/file/druid:db586ns4974/seda_documentation_4.1.pdf" target="_blank" rel="noopener noreferrer">SEDA Technical Documentation</a> for exceptions to that rule) based on the 2019 elementary and unified school district boundaries from EDGE. Similarly, we use the most recent county, metropolitan area, commuting zone, and state for each school to ensure stability over time. Note that SEDA includes special education schools (as defined by CCD) in school and state level data only (i.e. they are not included in district, county, metropolitan statistical area, or commuting zone level data). See the <a href="/help-faq/" target="_blank" rel="noopener noreferrer">FAQs</a> and the <a href="https://stacks.stanford.edu/file/druid:db586ns4974/seda_documentation_4.1.pdf" target="_blank" rel="noopener noreferrer">SEDA Technical Documentation</a> for more details. You can also use the published crosswalk on our <a href="/get-the-data/" target="_blank" rel="noopener noreferrer">Get The Data</a> page to obtain the stable or time-varying geographical information for years 2009-2019.

Below is a mock-up of the proficiency data format we use in school estimation: