.. meta::
   :title: MyDB in PostgreSQL – User Database Structure Explained
   :description: Learn what a user database (MyDB) is in PostgreSQL, how it differs from default databases, and what objects like schemas, extensions, and catalogs live inside it.
   :keywords: PostgreSQL MyDB, PostgreSQL user database, PostgreSQL database structure, PostgreSQL schemas, PostgreSQL extensions, pgAdmin databases
   :author: Sherullah Mohtat

|mydb| MyDB 
==============

.. |mydb| image:: /_static/images/sidebar_icons/mydb.png

MyDB represents a **user-created PostgreSQL database**.  
This is where **real application data lives** and where developers work most of the time.

Unlike system databases (such as ``postgres``), a user database is designed to store:
- Application tables
- Business logic
- Schemas
- Extensions
- Metadata related to the application

You can think of **MyDB as a workspace** inside the PostgreSQL server.

--------------------------------
What is MyDB conceptually?
--------------------------------

A PostgreSQL **server** can host **multiple databases**, and **MyDB is one of them**.

Each database:
- Is logically isolated
- Has its own schemas
- Has its own objects (tables, views, functions, etc.)
- Cannot directly access objects in another database

This isolation is intentional and provides:
- Security
- Stability
- Clear boundaries between applications

--------------------------------
What lives inside MyDB?
--------------------------------

Inside a database like MyDB, PostgreSQL organizes objects into categories.

These categories are exactly what you see below in the sidebar:

- **Casts** – Rules for converting one data type into another
- **Catalogs** – System tables describing database metadata
- **Event Triggers** – Hooks that react to DDL events
- **Extensions** – Optional PostgreSQL features (e.g. ``uuid-ossp``, ``postgis``)
- **Foreign Data Wrappers** – Access external data sources
- **Languages** – Procedural languages (PL/pgSQL, PL/Python, etc.)
- **Publications** – Objects used for logical replication
- **Schemas** – Namespaces that organize tables and other objects
- **Subscriptions** – Logical replication subscribers

Each of these sections represents a **different responsibility inside the database**.

------------------------------------------
Why PostgreSQL separates these objects
------------------------------------------

PostgreSQL follows a layered architecture:

.. code-block:: text

   Server
     └── Database (MyDB)
           ├── Schemas
           │     └── Tables / Views / Functions
           ├── Extensions
           ├── Languages
           ├── Replication Objects
           └── System Metadata

This separation allows PostgreSQL to:
- Scale cleanly
- Enforce permissions
- Keep system data safe
- Allow advanced features like replication and FDW

--------------------------------
How this maps to pgAdmin
--------------------------------

In pgAdmin, when you expand **MyDB**, you see the same structure:

- MyDB
  - Casts
  - Catalogs
  - Event Triggers
  - Extensions
  - Schemas
  - …

--------------------------------
What you should focus on first
--------------------------------

As a developer, you will mostly work with:

1. **Schemas**
2. **Tables**
3. **Indexes**
4. **Extensions**
5. **Functions**

The other sections exist mainly for:
- Administration
- Optimization
- Replication
- Advanced PostgreSQL features

---------------
Summary
---------------

.. note::

   **MyDB is a logical container inside a PostgreSQL server that holds all application data, schemas, and database-level objects.**

.. toctree::
   :hidden:
   :maxdepth: 4

   casts/index.rst
   catalogs/index.rst
   eventtriggers/index
   extensions/index
   foreigndatawrappers/index
   languages/index
   publications/index
   schemas/index
   subscriptions/index