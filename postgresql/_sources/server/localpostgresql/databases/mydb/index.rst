.. meta::
   :title: Default Database vs User Database in PostgreSQL
   :description: Learn the difference between default databases and user databases in PostgreSQL, including postgres, template1, and user-created databases.
   :keywords: PostgreSQL default database, postgres database, user database PostgreSQL, pgAdmin databases
   :author: Sherullah Mohtat

|mydb| MyDB 
==============

.. |mydb| image:: /_static/images/sidebar_icons/mydb.png

1️⃣ What is a User Database?
----------------------------

A user database is a database created by a user for real work.

Examples:
    - MyDB (in my case)
    - school_db
    - blog_db

User databases store:
	- Application data
	- Tables
	- Business logic
	- User schemas

2️⃣ Default vs User Databases
-----------------------------

+--------------------+------------------------+------------------+
| Feature            | Default Database       | User Database    |
+====================+========================+==================+
| Created by         | PostgreSQL             | User             |
+--------------------+------------------------+------------------+
| Purpose            | System / admin         | Application data |
+--------------------+------------------------+------------------+
| Safe to store data?| ❌ No                  | ✅ Yes           |
+--------------------+------------------------+------------------+
| Deleted normally?  | ❌ No                  | ✅ Yes           |
+--------------------+------------------------+------------------+
| Used by apps       | ❌ Never               | ✅ Always        |
+--------------------+------------------------+------------------+

.. code-block:: bash 

    Databases (2)
    |__ MyDB  ← user database
    └── postgres   ← default database

==========================================================================================

3️⃣  Real-World Analogy 
-----------------------

Think of PostgreSQL like an **office building:**

+------------------+----------------+
| PostgreSQL       | Real world     |
+==================+================+
| Server           | Building       |
+------------------+----------------+
| Default database | Reception      |
+------------------+----------------+
| User database    | Office room    |
+------------------+----------------+
| Tables           | Cabinets       |
+------------------+----------------+
| Rows             | Files          |
+------------------+----------------+

You **work in office rooms**, not at reception.

.. note::

    Summary

    Databases are logical containers that organize and isolate data inside a PostgreSQL server.
    