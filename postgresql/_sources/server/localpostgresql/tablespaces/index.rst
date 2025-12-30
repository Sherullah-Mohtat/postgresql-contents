.. meta::
   :title: Tablespaces (2) in PostgreSQL – Physical Data Storage Explained
   :description: Learn what tablespaces are in PostgreSQL, why pgAdmin shows Tablespaces (2), and how PostgreSQL uses tablespaces to store data on disk.
   :keywords: PostgreSQL tablespaces, Tablespaces (2) pgAdmin, pg_default, pg_global, PostgreSQL storage
   :author: Sherullah Mohtat

Tablespaces(2)
===============

In PostgreSQL, tablespaces define the physical locations on disk where database
objects are stored. The label Tablespaces (2) in pgAdmin indicates that two
default tablespaces are currently available on the PostgreSQL server.

A **tablespace** is a **physical location on disk** where PostgreSQL stores database objects such as tables and indexes.

By default, PostgreSQL uses built-in tablespaces, but it also allows custom ones.

Why does pgAdmin show Tablespaces (2)?
---------------------------------------

In pgAdmin, the number in parentheses shows the **count of tablespaces** available on the server.

.. code-block:: bash 

   Tablespaces (2)
   ├── pg_default
   └── pg_global

This means:
	- PostgreSQL currently has 2 tablespaces
	- Both are system-defined
	- No custom tablespaces have been created yet

What are the default tablespaces?
----------------------------------

1️⃣ pg_default
	- Stores **user data**
	- Default location for:

    - Tables
    - Indexes
    - Schemas

	- Used unless another tablespace is specified

Most of your databases live here.

2️⃣ pg_global
	- Stores **global system data**
	- Shared across all databases
	- Contains:

    - Roles (users)
    - System catalogs
    - Global metadata

You usually **never touch this directly.**

Why PostgreSQL uses tablespaces

Tablespaces allow you to:
	- Control **where data is stored**
	- Separate data across disks
	- Improve performance
	- Manage storage efficiently

Example use cases:
	- Fast SSD for indexes
	- Large HDD for archival tables
	- Separate disks for different workloads

**Real-world analogy**

Think of tablespaces like:
	- Folders on a hard drive
	- PostgreSQL decides which folder stores which data

But PostgreSQL manages everything internally.

**Tablespaces vs Databases**

+-----------------+------------------------------+
| Concept         | Purpose                      |
+=================+==============================+
| Database        | Logical container for data   |
+-----------------+------------------------------+
| Schema          | Namespace inside a database  |
+-----------------+------------------------------+
| Tablespace      | Physical storage location    |
+-----------------+------------------------------+

Tablespaces are about **disk,** not structure.

.. note::

   📝 **One-line summary**

   Tablespaces control where PostgreSQL stores database data physically on disk.




  
 