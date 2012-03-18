ENV_PATH = env
PACKAGE_NAME = wingman.app
REQUIREMENTS_FILE = requires.txt

.PHONY: default install-environment activate-environment deactivate-environment install-requirements clean

default:
	@echo "No default $(MAKE) target configured."
	@exit 1

install-environment:
	@if [ -d '$(ENV_PATH)' ]; then \
		echo "The Python environment at '$(ENV_PATH)' already exists, aborting." ; \
		exit 1 ; \
	fi
	@virtualenv --no-site-packages --distribute '$(ENV_PATH)'

activate-environment:
	@echo -e 'Please manually run the following command:\n\n\tsource $(ENV_PATH)/bin/activate\n'

deactivate-environment:
	@echo -e 'Please manually run the following command:\n\n\tdeactivate\n'

install-requirements:
	@if [ -z "${VIRTUAL_ENV}" ]; then \
		echo "You have not activated the Python environment at '$(ENV_PATH)', aborting." ; \
		$(MAKE) --no-print-directory activate-environment ; \
		exit 1 ; \
	fi
	@pip install -r '$(REQUIREMENTS_FILE)'

clean:
	@if [ ! -z "${VIRTUAL_ENV}" ]; then \
		echo "You are still using the Python environment at '$(ENV_PATH)', aborting." ; \
		$(MAKE) --no-print-directory deactivate-environment ; \
		exit 1 ; \
	fi
	@rm -Rf '$(ENV_PATH)'
	@rm -Rf '$(PACKAGE_NAME).egg-info'
