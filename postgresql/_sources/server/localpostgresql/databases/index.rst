.. meta::
   :title: Databases in PostgreSQL – What Databases (2) Means in pgAdmin
   :description: Learn what Databases (2) means in pgAdmin, how PostgreSQL databases work, and how databases store schemas and data.
   :keywords: PostgreSQL databases, Databases (2) pgAdmin, PostgreSQL database explained, pgAdmin databases
   :author: Sherullah Mohtat

Databases(2)
=============

In pgAdmin, **Databases (2)** means:

The PostgreSQL server currently contains **2 databases.**

Just like:
	- Servers (1)
	- Login / Group Roles (12)
	- Tablespaces (2)

The number in parentheses always represents a **count.**

====================================================================================

What is a Database in PostgreSQL?
----------------------------------

A **database** in PostgreSQL is:
	- **A logical container**
	- That holds:

	- Schemas
	- Tables
	- Views
	- Functions
	- Indexes
	- Data

Each database is **isolated** from others.

Objects inside one database **cannot directly access** objects in another database.

=========================================================================================

**Why pgAdmin shows Databases (2)**

.. code-block:: bash 
    
    Databases (2)
    |__ MyDB
    └── postgres
   
This means:
	- Only **two databases** exists on this PostgreSQL server
	- It was likely:

	- Created manually by you, or
	- Created automatically during installation

Many systems show **2 databases** by default:
	- postgres
	- A custom database

But in my case, there are **only two**, so pgAdmin correctly shows (2).

===========================================================================================

**Relationship: Server → Database → Objects**

This hierarchy is **very important:**

.. code-block:: bash

   Server
   └── Database
         └── Schema
            └── Tables / Views / Functions

So:
	- **Server** = PostgreSQL engine instance
	- **Database** = logical workspace
	- **Schema** = namespace inside database

🔐 Databases and Roles (Users)
-------------------------------

Each database:
	- Has an **owner** (a role)
	- Uses **role permissions** for access

Example:
	- Role sherullahmohtat owns the database
	- Other roles may have read/write access

This connects directly to **Login / Group Roles (12).**

================================================================================================

💾 Databases and Tablespaces
-----------------------------

Databases store their data in:
	- **A tablespace**

By default:
	- pg_default tablespace is used

So the chain becomes:

.. code-block:: bash 

   Tablespace → Database → Schema → Table

.. note::

   Summary

   Databases are logical containers in PostgreSQL that store schemas, tables, and data, isolated from other databases on the same server.


.. toctree::
   :maxdepth: 4
  
   mydb/index.rst 
   postgres/index.rst
  
 