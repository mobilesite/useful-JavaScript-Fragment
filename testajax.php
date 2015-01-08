<?php
    header('Content-Type:text/plain')
    echo <<<EOF
    Name:{$_POST['user_name']}
    Age:{$_POST['user_age']}
    EOF
?>