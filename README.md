<h1>Simple Rest Api</h1>
<p>Simple Symfony 4+ & Angular 8+ app which may serve as a starting point to build more advanced REST API.</p>
<h3>Still in development!</h3>
<ul>
    <li>FOS User integration (login, register, change password, view user account)</li>
    <li>User roles (admin, editor, regular user etc)</li>
    <li>User management (admin can activate/disable or delete user)</li>
    <li>Basic CRUD example with posts and categories</li>
    <li>File management system</li>
    <li>Layaout based on angular material</li>
    <li>Translations</li>
</ul>
<h2>Requirements:</h2>
<ul>
    <li>PHP 7+</li>
    <li>npm 6+</li>
    <li>composer</li>
</ul>
<h2>Installation</h2>
<ol>
    <li>Clone or download repository</li>
    <li>In api folder run <code>composer install</code></li>
    <li>In client folder run <code>npm install</code></li>
    <li>Adjust base_url & admin_url in client/src/environment.ts</li>
    <li>create <code>.env.local</code> file, copy the content from <code>.env</code> file and adjust DATABASE_URL</li>
    <li>From api folder run <code>bin/console doctrine:database:create</code></li>
    <li>Run <code>bin/console doctrine:schema:update --force<code> to update db schema</li>
    <li>Create user with admin privileges (as explained here: https://symfony.com/doc/master/bundles/FOSUserBundle/command_line_tools.html)</li>
    
    Generate JWT token keys (as explained here)
    
    <li>Run <code>npm start</code> from client dir to run application</li>
</ol>
