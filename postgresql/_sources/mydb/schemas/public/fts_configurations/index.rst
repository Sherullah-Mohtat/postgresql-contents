|fts_configurations| FTS Configurations
=========================================

.. |fts_configurations| image:: /_static/images/sidebar_icons/fts_configurations.png

--------------------------------
What is an FTS Configuration?
--------------------------------

An **FTS configuration** is the **rulebook** PostgreSQL uses to turn raw text into searchable terms and to interpret search queries. It answers questions like:
	- How is text **tokenized** (split into words)?
	- Which **dictionary** processes each token?
	- Are words **normalized** (e.g., case folding, stemming)?
	- Which tokens are **ignored** (stop-words)?

Think of it as the **glue** that connects parsers + dictionaries into one usable search behavior.

=========================================================================================================================================================================

-----------------------------------------------
The 4 building blocks (how they fit together)
-----------------------------------------------

.. code-block:: bash 

    Text
    ↓
    Parser        (splits text into tokens)
    ↓
    Token type    (word, number, email, URL, etc.)
    ↓
    Dictionary    (normalizes / filters tokens)
    ↓
    tsvector      (indexed searchable form)

An **FTS Configuration** defines **which dictionary is used for each token type** produced by the parser.

=========================================================================================================================================================================

-----------------------------------------------
Default configuration (what you usually see)
-----------------------------------------------

Most databases come with something like:
	- **Configuration**: english
	- **Parser**: default
	- **Dictionaries**: english_stem, simple

Example mapping (simplified):

.. list-table:: 
    :header-rows: 1

    * - Token type
      - Dictionary used
    * - word
      - english_stem
    * - numword
      - simple
    * - email
      - simple
    * - url
      - simple

=========================================================================================================================================================================

-------------------------------
Why FTS Configurations matter
-------------------------------

Without the right configuration:
	- Searches return **unexpected results**
	- Words don’t match because of **case, form, or punctuation**
	- Indexes are built but **queries don’t hit them**

With the right configuration:
	- Searches are **fast** (GIN/GiST indexes)
	- Queries are **accurate**
	- You can tune behavior **per column, per query, or per index**

=========================================================================================================================================================================

--------------------------
Core SQL you should know
--------------------------

1️⃣ List available configurations

.. code-block:: postgres 

    SELECT cfgname FROM pg_ts_config;

2️⃣ Inspect a configuration

.. code-block:: postgres 

    SELECT *
    FROM pg_ts_config_map
    WHERE mapcfg = 'english'::regconfig;

3️⃣ Convert text into searchable form

.. code-block:: postgres 

    SELECT to_tsvector('english', 'PostgreSQL makes text searchable');

4️⃣ Run a search query

.. code-block:: postgres 

    SELECT to_tsquery('english', 'searchable & text');

=========================================================================================================================================================================

----------------------------------
Using a configuration in a table
----------------------------------

Create a generated search column

.. code-block:: postgres 

    ALTER TABLE articles
    ADD COLUMN search tsvector
    GENERATED ALWAYS AS (
        to_tsvector('english', title || ' ' || body)
    ) STORED;

Index it

.. code-block:: postgres 

    CREATE INDEX idx_articles_search
    ON articles
    USING GIN (search);

Query it

.. code-block:: postgres 

    SELECT *
    FROM articles
    WHERE search @@ to_tsquery('english', 'database & indexing');

=========================================================================================================================================================================

-------------------------------------------------
When should you create a custom configuration?
-------------------------------------------------

Create your own when you need to:
	- Change **dictionary order**
	- Disable **stemming**
	- Treat special tokens differently
	- Apply different behavior per schema/app

Example: clone and customize

.. code-block:: postgres 

    CREATE TEXT SEARCH CONFIGURATION my_fts (COPY = english);

    ALTER TEXT SEARCH CONFIGURATION my_fts
    ALTER MAPPING FOR word
    WITH simple;

This keeps words intact instead of stemming them.

=========================================================================================================================================================================

How this appears in pgAdmin

In pgAdmin, **Schemas → public → FTS Configurations** shows:
	- Each configuration
	- Its parser
	- Token-to-dictionary mappings

It’s just a **UI view** of what exists in:
	- pg_ts_config
	- pg_ts_config_map

=========================================================================================================================================================================

Quick mental model
	- **Parser** = splitter
	- **Dictionary** = normalizer/filter
	- **Configuration** = rulebook that connects them
	- **tsvector / tsquery** = what actually runs fast




