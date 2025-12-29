.. meta::
   :description: Project-based PostgreSQL tutorials for beginners and advanced users. Learn PostgreSQL with real-world databases, security, performance, and administration using pgAdmin and psql.
   :keywords: PostgreSQL tutorials, learn PostgreSQL, PostgreSQL project based learning, PostgreSQL database, pgAdmin, psql, PostgreSQL security, PostgreSQL performance

Welcome to PostgreSQL Learning
==============================

Welcome to this learning space dedicated to **PostgreSQL** and modern relational
database design.

This platform is being built to provide **project-based PostgreSQL tutorials**,
where concepts are explained step by step and then applied to
**real-world database projects**, not isolated SQL examples.

The focus is on understanding PostgreSQL as a **complete system**:
server, databases, roles, security, storage, and performance.

What you'll find here
---------------------

- Beginner to advanced PostgreSQL tutorials
- Project-level understanding of PostgreSQL architecture
- PostgreSQL Server, Database, Schema, and Role concepts
- Authentication, permissions, and security
- Working with pgAdmin and psql
- SQL fundamentals and advanced queries
- Performance tuning and indexing
- Backup, restore, and troubleshooting
- PostgreSQL used in real applications (Django, APIs, production systems)

Who this is for
---------------

- Beginners starting with PostgreSQL
- Developers who want **deep understanding**, not just queries
- Backend engineers working with Django, APIs, and services
- Anyone who prefers learning **concepts + implementation together**

How this documentation is structured
-------------------------------------

PostgreSQL is explained using a **top-down, project-level model**:

- Server (PostgreSQL instance)
- Databases (project boundaries)
- Schemas (organization layer)
- Roles & permissions (security layer)
- Tablespaces (storage layer)
- Tables, indexes, views (data layer)
- Tools (pgAdmin, psql)

This mirrors how PostgreSQL is organized internally and how it appears in pgAdmin.

..
   ==================  # Top-level title
   ------------------  # Section
   ^^^^^^^^^^^^^^^^^^  # Subsection
   """"""""""""""""""  # Sub-subsection

..
   6️⃣ Internal linking (VERY important)

   Add links to related pages:

   - :doc:`guides/installation`
   - :doc:`tutorials/first-django-project`
   - :doc:`explanation/django-vs-flask`

   Google uses links to understand structure.

.. toctree::
   :maxdepth: 1
   :caption: Object Explorer

   server/index



.. toctree::
   :maxdepth: 4
   :caption: Tutorials
      
   tutorial/index
      

..
   PSQL <psql/index>
  












..
   .. toctree::
      :maxdepth: 2
      :caption: Get Started

      tutorials/index
      guides/index

   .. toctree::
      :maxdepth: 2
      :caption: Explanations

      explanation/index

   .. toctree::
      :maxdepth: 2
      :caption: How-To Recipes

      howto/index

   .. toctree::
      :maxdepth: 2
      :caption: Reference

      reference/index

   .. toctree::
      :maxdepth: 2
      :caption: Project Info

      pages/index.rst 
   

