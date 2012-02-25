#!/usr/bin/env python

import fnmatch, os

# Determine document root where system/ and application/ directories live.
project_path = os.path.realpath(os.path.join(os.path.dirname(__file__), '..'))

# Start by building a list of all available modules incl. the default 'application'.
available_modules = []
system_path = os.path.join(project_path, 'system', 'modules')
for dirname in os.listdir(system_path):
  if os.path.isdir(os.path.join(system_path, dirname)):
    available_modules.append(os.path.join(system_path, dirname))
available_modules.append(os.path.join(project_path, 'application'))

# Scan each module in order.
for module_path in available_modules:
  # Define the order of files to be included in.
  for dirname, pattern in [
      ('functions.js', None),
      ('bundles', '*.css'),
      ('bundles', '*.js'),
      ('classes', '*.js'),
      ('i18n', '*.js'),
      ('templates', '*.hbs'),
      ('assets', '*.less'),
      ('bootstrap.js', None)
    ]:
    try_path = os.path.join(module_path, dirname)
    if not os.path.exists(try_path):
      continue
    files = []
    # If just a file, append to the list.
    if os.path.isfile(try_path):
      files.append((try_path, None))
    # If a directory, scan for files matching pattern recursively.
    else:
      for top, directories, filename in os.walk(try_path):
        for filename in fnmatch.filter(filename, pattern):
          file_abspath = os.path.join(top, filename)
          files.append((file_abspath, os.path.relpath(file_abspath, try_path)))
      files.sort()
    # Print all files to STDOUT.
    for file_abspath, file_relpath in files:
      if file_abspath.endswith('.css'):
        print "<link rel=stylesheet href=%s>" % (os.path.relpath(file_abspath, project_path))
      if file_abspath.endswith('.less'):
        print "<style rel=stylesheet type=text/x-less>%s</style>" % (open(file_abspath).read())
      elif file_abspath.endswith('.js'):
        print "<script src=%s></script>" % (os.path.relpath(file_abspath, project_path))
      elif file_abspath.endswith('.hbs'):
        print "<script id=__template-%s type=text/x-handlebars-template>%s</script>" % (os.path.splitext(file_relpath.replace(os.sep, '-'))[0], open(file_abspath).read())
