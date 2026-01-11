.. meta::
   :title: Server (1) in pgAdmin – What It Means in PostgreSQL
   :description: Learn what Server (1) means in pgAdmin, why PostgreSQL uses the term server, and how pgAdmin organizes PostgreSQL server instances.
   :keywords: pgAdmin Server, Server (1) pgAdmin, PostgreSQL server instance, pgAdmin Object Explorer, PostgreSQL server explained
   :author: Sherullah Mohtat

|server_icon| Server(1)
=========================

.. |server_icon| image:: /_static/images/sidebar_icons/server.png


In pgAdmin, **Server (1)** represents the number of PostgreSQL server instances
currently registered and available for connection. Each server entry corresponds
to a running PostgreSQL service, whether it is local, remote, or cloud-based.

What does Server (1) mean in pgAdmin?
---------------------------------------

In pgAdmin, “Server” does NOT mean a physical machine only.
It means a PostgreSQL server instance that pgAdmin knows about.

.. code-block:: bash 

   Servers (1)
   └── Local PostgreSQL

This tells us:

	- pgAdmin has **1 server registered**
	- That server is named **Local PostgreSQL**

Why is it called a “Server”?
-----------------------------

A **PostgreSQL server** is:

	- A running PostgreSQL service (process)
	- Listening on a port (usually 5432)
	- Managing databases, users, and connections

Even on your own laptop, PostgreSQL still runs as a **server process**.

So:
	- Laptop ✔
	- Cloud ✔
	- Remote machine ✔

All are called **servers.**

====================================================================================================

Why “Local PostgreSQL”?
------------------------

**Local PostgreSQL** means:

PostgreSQL is running **on the same machine** as pgAdmin.

Technically:
	- Host: localhost or 127.0.0.1
	- PostgreSQL service started
	- pgAdmin connects locally

“Local” ≠ simple
“Local” just means **same computer**

What if you had more servers?
------------------------------

If you add more PostgreSQL connections, pgAdmin would show:

.. code-block:: bash 

   Servers (3)
   ├── Local PostgreSQL
   ├── Production PostgreSQL (AWS)
   └── Staging PostgreSQL

So the number updates automatically:
	- Servers (1)
	- Servers (2)
	- Servers (5)

======================================================================================================

Server hierarchy
-----------------

Inside **each Server**, PostgreSQL organizes things like this:

.. code-block:: bash 

   Server
   ├── Databases
   │   ├── Schemas
   │   │   ├── Tables
   │   │   ├── Views
   │   │   ├── Functions
   ├── Login / Group Roles
   └── Tablespaces

This is why **Server** is the **top-level object.**

.. note::

   **Summary**

   Server (1) indicates that pgAdmin is connected to one PostgreSQL server instance.

.. toctree::
   :hidden:
   :maxdepth: 14

   localpostgresql/index
  
