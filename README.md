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
    <li>In api directory run <code>composer install</code></li>
    <li>In client directory run <code>npm install</code></li>
    <li>Adjust base_url & admin_url in client/src/environment.ts</li>
    <li>Create <code>.env.local</code> file in api directory, copy the content from <code>.env</code> file and adjust DATABASE_URL</li>
    <li>From api folder run <code>php bin/console doctrine:database:create</code></li>
    <li>Run <code>php bin/console doctrine:schema:update --force</code> to update db schema</li>
    <li>Create user with admin privileges (as explained here: https://symfony.com/doc/master/bundles/FOSUserBundle/command_line_tools.html)</li>
    <li>Create folder <code>jwt</code> in api/config and paste ssh keys pair
    (how to generate private and public ssh keys: https://github.com/lexik/LexikJWTAuthenticationBundle/blob/master/Resources/doc/index.md#installation)</li>
    <li>From api dir run Symfony server: <code>php bin/console server:start</code></li>
    <li>Run <code>npm start</code> from client dir to run application</li>
    <li>Visit http://localhost:4200</li>
</ol>
