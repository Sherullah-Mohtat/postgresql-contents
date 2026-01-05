.. meta::
   :title: What is pgAdmin? PostgreSQL Graphical Administration Tool
   :description: Learn what pgAdmin is, how it works, and how it differs from PostgreSQL. pgAdmin is a graphical administration and management tool for managing PostgreSQL databases visually.
   :keywords: pgAdmin, PostgreSQL pgAdmin, PostgreSQL GUI tool, pgAdmin tutorial, PostgreSQL administration tool, PostgreSQL management GUI
   :author: Sherullah Mohtat

What is pgAdmin?
=================

pgAdmin is the most popular graphical administration and management tool for PostgreSQL.
It provides a visual interface that allows developers and database administrators
to manage, monitor, and interact with PostgreSQL databases efficiently.

🐘 **pgAdmin** is a **graphical administration and management tool** for PostgreSQL.

In simple words:

    pgAdmin is a **GUI application** that lets you **manage PostgreSQL visually** instead of using only terminal commands.

What pgAdmin is used for
-------------------------

With pgAdmin, you can:

	- Connect to PostgreSQL servers
	- Create and manage databases
	- Manage users (roles) and permissions
	- Write and run SQL queries
	- View tables, indexes, views, functions
	- Monitor activity and performance
	- Inspect server statistics and logs

All **without memorizing every SQL command.**

===================================================================================================================================

pgAdmin vs PostgreSQL (very important)
----------------------------------------

Many beginners confuse these two.

+--------------------------------+----------------------------------+
| PostgreSQL                     | pgAdmin                          |
+================================+==================================+
| Database server (engine)       | Management tool                  |
+--------------------------------+----------------------------------+
| Stores data                    | Does NOT store data              |
+--------------------------------+----------------------------------+
| Runs as a service              | Runs as an application           |
+--------------------------------+----------------------------------+
| Can work without pgAdmin       | Requires PostgreSQL              |
+--------------------------------+----------------------------------+

**pgAdmin cannot exist without PostgreSQL**

**PostgreSQL works fine without pgAdmin**

===================================================================================================================================

Analogy (easy to remember)
---------------------------

Think of:
	- **PostgreSQL** = Engine of a car 🚗
	- **pgAdmin** = Dashboard & control panel 🧭

You can drive without the dashboard, but the dashboard makes life easier.

===================================================================================================================================

🖥️ Types of pgAdmin
--------------------

**1️⃣ pgAdmin Desktop**
	
    - Installed on your computer
	- Uses browser-based UI internally
	- Common for developers

**2️⃣ pgAdmin Web**

	- Runs on a server
	- Accessed via browser
	- Used by teams / enterprises

Both do the **same job.**

===================================================================================================================================

🔌 What pgAdmin connects to
----------------------------

**pgAdmin can connect to:**

	- Local PostgreSQL (localhost)
	- Remote PostgreSQL servers
	- Cloud PostgreSQL (AWS RDS, Azure, GCP)
	- Multiple servers at once

That’s why you see:

.. code-block:: bash 

    Servers (1)

📁 What pgAdmin manages (high-level)
-------------------------------------

.. code-block:: bash 

    PostgreSQL Server
    ├── Databases
    │   ├── Schemas
    │   │   ├── Tables
    │   │   ├── Views
    │   │   └── Functions
    ├── Roles (Users & Groups)
    └── Tablespaces

pgAdmin simply **shows and controls** this hierarchy.

==================================================================================================================================

🔐 Is pgAdmin required?
-----------------------

❌ **No — PostgreSQL works with:**

	- psql
	- Application code
	- ORMs

✅ **But pgAdmin is highly recommended for:**

	- Learning
	- Debugging
	- Visualization
	- Administration tasks

==================================================================================================================================

.. note::

   **Summary**

   pgAdmin is a graphical administration tool that allows users to manage,
   monitor, and interact with PostgreSQL databases through a visual interface.
   Besides pgAdmin, several graphical administration and management tools—such as DBeaver, DataGrip, and TablePlus—are available to manage PostgreSQL databases, each offering different features and user experiences.


..
  rst file table 
	.. list-table:: User table
	:header-rows: 1
	:widths: 20 20 60
	* - Column
		- Type
		- Description
	* - id
		- integer
		- Primary key
	* - name
		- text
		- User name
	* - email
		- text
		- Must be unique
	


.. 
	.. list-table::
	:header-rows: 1
	* - Method
		- Example
	* - SQL
		- .. code-block:: sql
			SELECT * FROM users;

..
	.. list-table::
	:header-rows: 1
	* - Name
		- Docs
	* - PostgreSQL
		- `Official Docs <https://www.postgresql.org/docs/>`_
	
..
	.. list-table::
	:header-rows: 1
	* - Feature
		- Screenshot
	* - pgAdmin
		- .. image:: _static/images/logo/logo.jpeg
			:width: 200px

	  